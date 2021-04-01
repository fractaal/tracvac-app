import { Knex } from 'knex';

export const migrations = [
  {
    version: 1,
    description: 'Add metadata table',
    up: async (knex: Knex) => {
      await knex.schema.createTable('metadata', t => {
        t.string('key').notNullable();
        t.string('value').notNullable();
        t.increments('id').primary();
      }).then();
    },

    down: async (knex: Knex) => {
      knex.schema.dropTable('metadata');
    }
  },
  {
    version: 2,
    description: 'Add users table',
    up: async (knex: Knex) => {
      await knex.schema.createTable('users', t => {
        // Primary
        t.increments('id').primary();

        // User data needed for stuff like this
        t.string('username').notNullable().index();
        t.string('password').notNullable();
        t.string('email').notNullable();
        t.string('profilePicturePath');

        // Updated at / created at
        t.dateTime('createdAt')
        t.dateTime('updatedAt')

        // Vaccination status
        t.boolean('isVaccinated').defaultTo(false);
        t.enum('isVaccineReady', [
          'Not Ready',
          'Pending',
          'Ready',
        ]).defaultTo('Not Ready');
        t.string('vaccineManufacturer')

        t.enum('category', [
          '01 - Health Care Worker',
          '02 - Senior Citizen',
          '03 - Indigent',
          '04 - Uniformed Personnel',
          '05 - Essential Worker',
          '06 - Other',
        ]).notNullable();

        t.string('categoryID');
        t.string('philHealthID');
        t.string('lastName').notNullable();
        t.string('firstName').notNullable();
        t.string('middleName').notNullable();
        t.string('suffix');
        t.string('contactNumber');
        t.string('fullAddress').notNullable();
        t.string('province').notNullable();
        t.string('municipalityOrCity').notNullable();
        t.string('barangay').notNullable();

        t.enum('sex', [
          '01 - Female',
          '02 - Male',
          '03 - Not to Disclose'
        ]).notNullable();

        t.string('dateOfBirth').notNullable();

        t.enum('civilStatus', [
          '01 - Single',
          '02 - Married',
          '03 - Widow/Widower',
          '04 - Separated/Annulled',
          '05 - Living with Partner',
        ]).notNullable();

        t.enum('employed', [
          '01 - Government Employed',
          '02 - Private Employed',
          '03 - Self Employed',
          '04 - Private Practitioner',
          '05 - Others',
        ]);

        t.enum('profession', [
          '01 - Dental Hygienist',
          '02 - Dental Technologist',
          '03 - Dentist',
          '04 - Medical Technologist',
          '05 - Midwife',
          '06 - Nurse',
          '07 - Nutritionist/Dietician',
          '08 - Occupational Therapist',
          '09 - Optomerist',
          '10 - Pharmacist',
          '11 - Physical Therapist',
          '12 - Physician',
          '13 - Radiologic Technologist',
          '14 - Respiratory Therapist',
          '15 - X-ray Technologist',
          '16 - Barangay Health Worker',
          '17 - Maintenance Staff',
          '18 - Administrative Staff',
          '19 - Other Workers in Frontline Health Services',
        ]);

        t.string('otherProfession').nullable();
        t.boolean('directCOVID');
        t.string('employerName');
        t.string('employerLGU');
        t.string('employerAddress');
        t.string('employerContactNumber');
        t.boolean('pregnancyStatus').defaultTo(false);
        t.boolean('withAllergy');
        t.string('allergy').nullable();
        t.boolean('withComorbidities');
        t.enum('comorbidity', [
          '01 - Hypertension',
          '02 - Heart Disease',
          '03 - Kidney Disease',
          '04 - Diabetes Mellitus',
          '05 - Bronchial Asthma',
          '06 - Immunodeficiency State',
          '07 - Cancer',
          '08 - Others',
        ]).nullable();

        t.boolean('covidHistory');
        t.string('covidDate');
        t.enum('covidClassification', [
          '01 - Asymptomatic',
          '02 - Mild',
          '03 - Moderate',
          '04 - Severe',
          '05 - Critical',
        ])

        t.enum('consentForDataCollection', [
          '01 - Yes',
          '02 - No',
          '03 - Unknown',
        ])

        t.enum('consentForVaccination', [
          '01 - Yes',
          '02 - No',
          '03 - Unknown',
        ])
      })
    },
    down: async (knex: Knex) => {
      knex.schema.dropTable('users');
    }
  },
  {
    version: 3,
    description: 'Adds a log table containing logs users may submit',
    up: async (knex) => {
      await knex.schema.createTable('logs', t => {
        // Primary key
        t.increments('id').primary();
        // Foreign key
        t.integer('userId').index();
        t.foreign('userId').references('id').inTable('users');

        t.boolean('fever').defaultTo('false')
        t.boolean('abdominalPain').defaultTo('false')
        t.boolean('chills').defaultTo('false')
        t.boolean('cough').defaultTo('false')
        t.boolean('diarrhea').defaultTo('false')
        t.boolean('difficultyBreathing').defaultTo('false')
        t.boolean('headache').defaultTo('false')
        t.boolean('soreThroat').defaultTo('false')
        t.boolean('nauseaOrVomiting').defaultTo('false')

        // Created at / updated at
        t.dateTime('createdAt')
        t.dateTime('updatedAt')
      })
    },
    down: async (knex) => {
      await knex.schema.dropTable('logs');
    }
  },
  {
    version: 4,
    description: 'Create notifications table',
    up: async (knex: Knex) => {
      await knex.schema.createTable('notifications', table => {
        table.increments('id').primary();
        table.string('title').notNullable()
        table.string('subtitle')
        table.string('content').notNullable()

        // Created at / updated at
        table.dateTime('createdAt')
        table.dateTime('updatedAt')
      })
    },
    down: async (knex: Knex) => {
      await knex.schema.dropTable('notifications');
    }
  },
  {
    version: 5,
    description: 'Create PUI/PUM fields in users',
    up: async (knex: Knex) => {
      await knex.schema.table("users", table => {
        // Is PUI / Is PUM fields
        table.boolean("isPUI").defaultTo(false)
        table.boolean("isPUM").defaultTo(false)
      })
    },
    down: async (knex: Knex) => {
      await knex.schema.table("users", table => {
        table.dropColumn("isPUI");
        table.dropColumn("isPUM");
      })
    }
  }
] as {version: number; description: string; up(knex: Knex): Promise<any>; down(knex: Knex): Promise<any>}[];
