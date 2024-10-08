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
        t.string('username').notNullable().unique().index();
        t.string('password').notNullable();
        t.string('email').notNullable().unique();
        t.string('profilePicturePath').defaultTo('public/placeholder.png');

        // Dosage no.
        t.integer('dosageNumber').defaultTo(0)

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


        t.enum('categoryID', [
          'PRC ID',
          'OSCA / Senior Citizen ID',
          'Facility ID',
          'PWD ID',
          'Postal ID',
          'SSS ID',
          'Other'
        ]);
        t.string('otherCategoryID')
        t.string('categoryIDNumber')

        t.string('philHealthID');
        t.string('lastName').notNullable();
        t.string('firstName').notNullable();
        t.string('middleName');
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
          '19 - Others',
        ]);

        t.string('otherProfession').nullable();
        t.boolean('directCOVID');
        t.string('employerName');
        t.string('employerLGU');
        t.string('employerAddress');
        t.string('employerContactNumber');
        t.boolean('pregnancyStatus').defaultTo(false);
        t.boolean('withAllergy');
        t.string('allergy')
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
        ]).notNullable()

        t.enum('consentForVaccination', [
          '01 - Yes',
          '02 - No',
          '03 - Unknown',
        ]).notNullable()

        // Is PUI / Is PUM fields
        t.boolean("isPUI").defaultTo(false)
        t.boolean("isPUM").defaultTo(false)

        // Pre-existing medical condition
        t.string("preexistingCondition")
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

        t.boolean('fever').defaultTo(false)
        t.boolean('abdominalPain').defaultTo(false)
        t.boolean('chills').defaultTo(false)
        t.boolean('cough').defaultTo(false)
        t.boolean('diarrhea').defaultTo(false)
        t.boolean('difficultyBreathing').defaultTo(false)
        t.boolean('headache').defaultTo(false)
        t.boolean('soreThroat').defaultTo(false)
        t.boolean('nauseaOrVomiting').defaultTo(false)

        t.string('others') // <- If others, please specify
        t.boolean("adminHasRead").defaultTo(false)

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
    description: 'Create push subscriptions table',
    up: async (knex) => {
      await knex.schema.createTable('pushSubscriptions', table => {
        table.increments('id').primary();
        table.integer('userId').notNullable();
        table.foreign('userId').references('id').inTable('users');
        table.json('subscription').notNullable();
        table.string('token').notNullable();

        table.dateTime('createdAt');
        table.dateTime('updatedAt');
      });
    },
    down: async (knex) => {
      await knex.schema.dropTable('pushSubscriptions');
    }
  },
  {
    version: 6,
    description: 'Add lastVaccinationTime field to users table',
    up: async (knex) => {
      await knex.schema.table('users', table => {
        table.dateTime('lastVaccinationTime')
      })
    },
    down: async (knex) => {
      await knex.schema.table('users', table => {
        table.dropColumn('lastVaccinationTime')
      })
    }
  },
  {
    version: 7,
    description: 'Add otherComorbidityfield to users table',
    up: async (knex) => {
      await knex.schema.table('users', table => {
        table.string('otherComorbidity')
      })
    },
    down: async (knex) => {
      await knex.schema.table('users', table => {
        table.dropColumn('otherComorbidity')
      })
    }
  },
  {
    version: 8,
    description: 'Add group field to users table',
    up: async (knex) => {
      await knex.schema.table('users', table => {
        table.string('group')
      })
    },
    down: async (knex) => {
      await knex.schema.table('users', table => {
        table.dropColumn('group')
      })
    }
  },
  {
    version: 9,
    description: 'Add companyBranch field to users table',
    up: async (knex) => {
      await knex.schema.table('users', table => {
        table.string('companyBranch')
      })
    },
    down: async (knex) => {
      await knex.schema.table('users', table => {
        table.dropColumn('companyBranch')
      })
    }
  }
] as {version: number; description: string; up(knex: Knex): Promise<any>; down(knex: Knex): Promise<any>}[];
