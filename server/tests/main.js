const chai = require('chai');
const chaiHttp = require('chai-http')
const { expect } = chai;
const usernameGenerator = require('username-generator')
const username = usernameGenerator.generateUsername().substring(0, 20)
const password = usernameGenerator.generateUsername()
const email = `${username}@${password}.com`

chai.use(chaiHttp)

const invalidRegistrationMutators = [
  {
    username: username.substring(0, 5)
  },
  {
    email: "invalid-email-string"
  },
  {
    contactNumber: "31265372543",
  },
  {
    employerContactNumber: "3126537"
  }
]

const validRegistrationData = {
	"username": username,
	"password": password,
	"email": email,
	"category": "01 - Health Care Worker",
	"categoryID": "PRC ID",
	"philHealthID": "string",
	"lastName": "string",
	"firstName": "string",
	"middleName": "string",
	"suffix": "string",
	"contactNumber": "09260729017",
	"fullAddress": "string",
	"province": "string",
	"municipalityOrCity": "string",
	"barangay": "string",
	"sex": "03 - Not to Disclose",
	"dateOfBirth": "2001/12/29",
	"civilStatus": "01 - Single",
	"employed": "01 - Government Employed",
	"profession": "12 - Physician",
	"otherProfession": "string",
	"employerContactNumber": "09260729017",
	"directCOVID": true,
	"pregnancyStatus": false,
	"withAllergy": false,
	"allergy": "string",
	"withComorbidities": false,
	"comorbidity": "01 - Hypertension",
	"covidHistory": false,
	"consentForDataCollection": "01 - Yes",
	"consentForVaccination": "01 - Yes"
}

function findNested(obj, value) {
  Object.keys(obj).map(key => {
    if (typeof obj[key] !== "object" && obj[key] === value) {
      return true
    } else if (typeof obj[key] === "object") {
      if (findNested(obj[key], value)) {
        return true
      }
    }
  })
}

const apiResponses = [];

describe("General API Test", () => {

  describe('Registration', () => {
    
    describe("Applying invalid registration mutations", () => {
      invalidRegistrationMutators.map((mutation, index) => {
        const invalidRegistrationData = Object.assign({}, validRegistrationData, mutation)
        it(`Should return bad request if ${JSON.stringify(mutation)}`, (done) => {
          chai.request("localhost")
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
      chai.request("localhost")
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
      chai.request("localhost")
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
      chai.request("localhost")
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
  
  let token = "";
  let currentUserInfo = {};
  let logs = [];

  describe("Logins", () => {
    it("Should forbid log in with the wrong username but right password", done => {
      chai.request("localhost")
        .post("/login")
        .send({ username: "WRONG_USER_NAME_HEHE", password })
        .end((err, res) => {
          expect(res.body.result).to.equals(false)
          apiResponses.push(res.body)
          done()
        })
    })
    it("Should forbid log in with the right username but wrong password", done => {
      chai.request("localhost")
        .post("/login")
        .send({ username, password: "123" })
        .end((err, res) => {
          expect(res.body.result).to.equals(false)
          apiResponses.push(res.body)
          done()
        })
    })
    it("Should allow log in with the right username and right password", done => {
      chai.request("localhost")
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
      chai.request("localhost")
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
      invalidRegistrationMutators.map((mutation, index) => {
        const invalidRegistrationData = Object.assign({}, validRegistrationData, mutation)
        it(`Should not change the user if invalid registration mutation ${JSON.stringify(mutation)} is applied`, (done) => {
          chai.request("localhost")
            .patch("/user")
            .send(invalidRegistrationData)
            .end((err, res) => {
              expect(res.body.result).to.equals(false)
              apiResponses.push(res.body)
              chai.request("localhost")
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
        chai.request("localhost")
          .post("/log")
          .send({})
          .end((err, res) => {
            expect(res.body.result).to.equals(false)
            apiResponses.push(res.body)
            done()
          })
      })
      it("Should allow submission of logs that have symptoms", done => {
        chai.request("localhost")
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
        chai.request("localhost")
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
        const lowestLogId = logs.reduce((acc, curr) => { acc = acc > curr ? curr : acc }, 9999999)
        chai.request("localhost")
          .delete(`/log/${lowestLogId-1}`)
          .set("X-Access-Token", token)
          .end((err, res) => {
            expect(res.body.result).to.equals(false)
            apiResponses.push(res.body)
            done()
          })
      })

      it("Should allow deletion of logs that this user owns", done => {
        chai.request("localhost")
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
})

describe("Basic Security Audit", () => {
  apiResponses.map((response, index) => {
    it(`Should not have exposed sensitive information in API response #${index}`, done => {
      expect(findNested(response, password)).to.equal(false)
      done()
    })
  })
})
