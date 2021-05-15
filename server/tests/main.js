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

console.log(JSON.stringify(validRegistrationData, null, 2))

describe("Registration", () => {

  describe('Invalid Registration', () => {
    invalidRegistrationMutators.map((mutation, index) => {
      const invalidRegistrationData = Object.assign({}, validRegistrationData, mutation)
      it(`Should return bad request if ${JSON.stringify(mutation)}`, (done) => {
        chai.request("localhost")
          .post("/user")
          .send(invalidRegistrationData)
          .end((err, res) => {
            expect(res.body.result).to.equals(false)
            done()
          })
      })
    })
  })
  
  describe("Valid Registration", () => {
    it("Should successfully register a user", (done) => {
      chai.request("localhost")
        .post("/user")
        .send(validRegistrationData)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.result).to.equals(true)
          expect(res).to.have.status(200);
          done();
        })
    })
  })

  describe("Repeats", () => {
    it("Should not allow a registration with an existing username", done => {
      chai.request("localhost")
        .post("/user")
        .send(Object.assign({}, validRegistrationData, {email: `${usernameGenerator.generateUsername()}@gmail.com`}))
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.result).to.equals(false)
          done();
        })
    })
    
    it("Should not allow a registration with an existing email", done => {
      chai.request("localhost")
        .post("/user")
        .send(Object.assign({}, validRegistrationData, {username: usernameGenerator.generateUsername()}))
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.result).to.equals(false)
          done();
        })
    })
  })
  /* 
  describe("User actions", () => {
    let token = "";

    describe("Logging in", () => {
      it("Should not be able to log in with the wrong username but right password", done => {

      })
    })
  })
  */
})

