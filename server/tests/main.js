if (process.env.IS_GITHUB_ACTIONS != "true") {
  require('dotenv').config()
}

const exceptionLogger = (error) => {
  console.error(error.stack)
  fs.writeFileSync(path.resolve(process.cwd(), `${Date.now()}-test-error.log`), error.stack, {encoding: 'utf-8'});
}

process.on('uncaughtException', exceptionLogger)
process.on('unhandledRejection', exceptionLogger)

process.env.NODE_ENV = "TEST"

const chai = require('chai');
const chaiHttp = require('chai-http')
const { expect } = chai;
const usernameGenerator = require('username-generator')
const { app } = require('../dist/index.js')
const { knex } = require('../dist/database/')

chai.use(chaiHttp)

const username = usernameGenerator.generateUsername().substring(0, 20)
const password = usernameGenerator.generateUsername()
const email = `${username}@${password}.com`
const validRegistrationData = Object.assign({}, require("./validRegistrationData"), {username, password, email})
const invalidRegistrationMutations = require("./invalidRegistrationMutations")

// Add in the computed invalid username
invalidRegistrationMutations[0].username = username.substring(0, 5)

let vapidPrivateKey = ""
let token = "";
let currentUserInfo = {};
let logs = [];

const authorizedEndpoints = ["/user", "/log", "/notification", "/getVAPIDPublicKey"]
const apiResponses = [];

// This is horrible, but by the time we'll check for the vapid private key, this promise should have resolved. 
knex('metadata').where({key: 'vapidPrivateKey'}).first().then(obj => vapidPrivateKey = obj.value)

// This is also horrible, but by 20 seconds, the test should be complete. So just exit by then.
setTimeout(process.exit, 60000, 0)

// Find a value in a nested object. This function is used to search API responses for sensitive info.
function findNested(obj, value) {
  for (const key of Object.keys(obj)) {
    if (obj[key] === value) {
      return true
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      const recursionResult = findNested(obj[key], value)
      if (recursionResult) return true
    }
  }
  return false
}


describe("✨ Good luck, me!", () => {
  const wait = new Promise(r => {

    describe('Registration', () => {
      
      describe("Applying invalid registration mutations", () => {
        invalidRegistrationMutations.map((mutation, index) => {
          const invalidRegistrationData = Object.assign({}, validRegistrationData, mutation)
          it(`Should return bad request if ${JSON.stringify(mutation)}`, (done) => {
            chai.request(app)
              .post("/user")
              .send(invalidRegistrationData)
              .end((err, res) => {
                expect(res.body.result).to.equals(false)
                apiResponses.push(res.body)
                done()
              })
          })
        })
      })

      it("Should allow valid registration", (done) => {
        chai.request(app)
          .post("/user")
          .send(validRegistrationData)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.result).to.equals(true)
            expect(res).to.have.status(200);
            apiResponses.push(res.body)
            done();
          })
      })
    })
    
    describe("Already Existing Checks", () => {
      it("Should forbid registration with an existing username", done => {
        chai.request(app)
          .post("/user")
          .send(Object.assign({}, validRegistrationData, {email: `${usernameGenerator.generateUsername()}@gmail.com`}))
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.result).to.equals(false)
            apiResponses.push(res.body)
            done();
          })
      })
      
      it("Should forbid registration with an existing email", done => {
        chai.request(app)
          .post("/user")
          .send(Object.assign({}, validRegistrationData, {username: usernameGenerator.generateUsername()}))
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.result).to.equals(false)
            apiResponses.push(res.body)
            done();
          })
      })
    })
    

    describe("Logins", () => {
      it("Should forbid log in with the wrong username but right password", done => {
        chai.request(app)
          .post("/login")
          .send({ username: "WRONG_USER_NAME_HEHE", password })
          .end((err, res) => {
            expect(res.body.result).to.equals(false)
            apiResponses.push(res.body)
            done()
          })
      })
      it("Should forbid log in with the right username but wrong password", done => {
        chai.request(app)
          .post("/login")
          .send({ username, password: "123" })
          .end((err, res) => {
            expect(res.body.result).to.equals(false)
            apiResponses.push(res.body)
            done()
          })
      })
      it("Should allow log in with the right username and right password", done => {
        chai.request(app)
          .post("/login")
          .send({ username, password })
          .end((err, res) => {
            expect(res.body.result).to.equals(true)
            token = res.body.token
            apiResponses.push(res.body)
            done()
          })
      })
    })

    describe("User Info", () => {
      it("Should return user information", done => {
        chai.request(app)
          .get("/user")
          .set("X-Access-Token", token)
          .end((err, res) => {
            expect(res.body.result).to.equals(true)
            expect(res.body.user).to.be.an('object')
            currentUserInfo = res.body.user
            apiResponses.push(res.body)
            done()
          })
      })


      describe("Applying invalid registration mutations on update user info", done => {
        invalidRegistrationMutations.map((mutation, index) => {
          const invalidRegistrationData = Object.assign({}, validRegistrationData, mutation)
          it(`Should not change the user if invalid registration mutation ${JSON.stringify(mutation)} is applied`, (done) => {
            chai.request(app)
              .patch("/user")
              .send(invalidRegistrationData)
              .end((err, res) => {
                expect(res.body.result).to.equals(false)
                apiResponses.push(res.body)
                chai.request(app)
                  .get('/user')
                  .set("X-Access-Token", token)
                  .end((err, res) => {
                    expect(res.body.user).to.deep.equals(currentUserInfo)
                    apiResponses.push(res.body)
                    done()
                  })
              })
          })
        })
      })
    })

    describe("Logs", () => {
      describe("Submission", () => {
        it("Should not allow submission of logs that have no symptoms", done => {
          chai.request(app)
            .post("/log")
            .send({})
            .end((err, res) => {
              expect(res.body.result).to.equals(false)
              apiResponses.push(res.body)
              done()
            })
        })
        it("Should allow submission of logs that have symptoms", done => {
          chai.request(app)
            .post("/log")
            .set("X-Access-Token", token)
            .send({others: "I am dying", difficultyBreathing: true})
            .end((err, res) => {
              expect(res.body.result).to.equals(true)
              apiResponses.push(res.body)
              done()
            })
        })
      })

      describe("Retrieval", () => {
        it("Should allow retrieval of all logs", done => {
          chai.request(app)
            .get(`/log/${0}`)
            .set("X-Access-Token", token)
            .end((err, res) => {
              expect(res.body.result).to.equals(true)
              expect(res.body.logs.results).to.be.an('array')
              logs = res.body.logs.results
              apiResponses.push(res.body)
              done()
            })
        })
      })

      describe("Deletion", () => {
        it("Should not allow deletion of logs that the user does not own", done => {
          chai.request(app)
            .delete(`/log/1`)
            .set("X-Access-Token", token)
            .end((err, res) => {
              expect(res.body.result).to.equals(false)
              apiResponses.push(res.body)
              done()
            })
        })

        it("Should allow deletion of logs that this user owns", done => {
          chai.request(app)
            .delete(`/log/${logs[0].id}`)
            .set("X-Access-Token", token)
            .end((err, res) => {
              expect(res.body.result).to.equals(true)
              apiResponses.push(res.body)
              done()
            })
        })
      })
    })

    describe("VAPID", () => {
      it("Should return the VAPID public key", done => {
        chai.request(app)
          .get("/getVAPIDPublicKey")
          .set("X-Access-Token", token)
          .end((err, res) => {
            expect(res.body.result).to.equals(true)
            expect(res.body.publicKey).to.be.a("string")
            done()
          })
      })
    })

    describe("Authorized Endpoints Security Audit", () => {
      authorizedEndpoints.map((endpoint, index) => {
        ["get", "post", "patch", "delete"].map(method => {
          if (endpoint === '/user' && method === 'post') return
          
          it(`Should forbid this ${method.toUpperCase()} request to endpoint ${endpoint}`, done => {
            chai.request(app)
              [method](endpoint)
              .end((err, res) => {
                console.log("\t", res.body)
                expect(res.status).to.be.greaterThanOrEqual(400)
                apiResponses.push(res.body)
                if (index+1 === authorizedEndpoints.length) r();
                done()
              })
          })
        })
      })
    })
  })

  
  wait.then(() => {
    describe("API Responses Security Audit", () => {
      it(`Total of ${apiResponses.length} API responses`, done => { done() })
      apiResponses.map((response, index) => {
        it(`Should not have exposed sensitive information in API response ${JSON.stringify(response)}`, done => {
          expect(findNested(response, vapidPrivateKey), "VAPID private key should not be found").to.equal(false)
          expect(findNested(response, password), "Raw password should not be found").to.equal(false)
          done()
        })
      })
    })

    describe("Test Cleanup", () => {
      it("Should remove the test user", done => {
        knex('users')
          .where('id', currentUserInfo.id)
          .del()
          .then(numAffected => {
            expect(numAffected, "Number of rows affected should be 1").to.equal(1)
            done()
          })
      })
    })
  })

})



