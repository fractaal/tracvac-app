const fs = require('fs')
const csvWriter = require('csv-write-stream')
const faker = require('faker')

let writer = csvWriter()
let counter = 0

writer.pipe(fs.createWriteStream('data.csv'))
for (let i = 0; i < 100000; i++) {
	writer.write({
		id: counter++,
		username: faker.internet.userName() + (Math.random() * 10000000).toFixed(),
		password: faker.internet.password(),
		email: (Math.random() * 10000000).toFixed() + faker.internet.email(),
		profilePicturePath: 'public/placeholder.png',
		dosageNumber: 0,
		isVaccinated: false,
		isVaccineReady: 'Not Ready',
		category: '06 - Other',
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		middleName: faker.name.middleName(),
		suffix: '',
		contactNumber: faker.phone.phoneNumber(),
		fullAddress: faker.address.streetAddress(),
		province: faker.address.state(),
		municipalityOrCity: faker.address.city(),
		barangay: faker.address.secondaryAddress(),
		sex: '01 - Female',
		dateOfBirth: faker.date.past(),
		civilStatus: '01 - Single',
		employed: '03 - Self Employed',
		profession: '19 - Others',
		otherProfession: '',
		directCOVID: false,
		pregnancyStatus: false,
		consentForDataCollection: '01 - Yes',
		consentForVaccination: '01 - Yes'
	})
}