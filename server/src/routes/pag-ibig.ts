/**
 * Pag-Ibig specific module
 */

import { knex } from "../database"
import { app } from "../index"
import { UserModel as _ } from "../database/models/UserModel"
import { addInsightLoader } from "../insight"
import Logger from "../logger"

const logger = Logger("PagIbig")

const vaccinationDeferralTriggers = {
    "Below16": true,
    "AllergyPEGOrPolysorbate": true,
    "SevereAllergicReactionPfizer": true,
    "AllergyFood.Monitor": true,
    "HistoryBleeding.AvailableSyringe": false,
    "ManifestSymptoms": true,
    "BloodPressure": true,
    "HistoryExposureCOVID": true,
    "HistoryExposureCOVID.UndergoingTreatment": true,
    "HadAttacks": true,
    "ReceivedVaccine": true,
    "ReceivedPlasma": true,
    "IsPregnant.InFirstTrimester": true,
    "HadHealthConditions.Objection": true
}

// Pag-Ibig related data
class UserModel extends _ {
    isDeferredFirst!: boolean;
    isDeferredSecond!: boolean;
    healthDeclarationData!: Record<string,any>;
}

addInsightLoader(async () => {
    const isDeferredFirst: Record<string,any> = {};

    (await UserModel.query()
        .select('isDeferredFirst')
        .count('isDeferredFirst')
        .groupBy('isDeferredFirst')
        .orderBy('isDeferredFirst')
    ).forEach((val: any) => isDeferredFirst[`${val.isDeferredFirst === true ? 'Yes' : 'No'}`] = val.count);

    return ["Is Deferred? (First)", isDeferredFirst]
});

addInsightLoader(async () => {
    const isDeferredSecond: Record<string,any> = {};

    (await UserModel.query()
        .select('isDeferredSecond')
        .count('isDeferredSecond')
        .groupBy('isDeferredSecond')
        .orderBy('isDeferredSecond')
    ).forEach((val: any) => isDeferredSecond[`${val.isDeferredSecond === true ? 'Yes' : 'No'}`] = val.count);

    return ["Is Deferred? (Second)", isDeferredSecond]
});

(async () => {
    // Perform schema changes to the user table
    await knex.schema.table('users', async table => {
        if (! await knex.schema.hasColumn('users', 'isDeferredFirst')) {
            table.boolean('isDeferredFirst')
            table.boolean('isDeferredSecond')
            table.json('healthDeclarationData')
        }
    })

    app.post('/healthDeclarationForm', async (req, res) => {
        if (!Array.isArray(req.body)) { res.status(400).json({result: false, message: 'Invalid data'}); return }

        logger.log(`User ${req.tokenData.userId} updated health declaration:`, req.body)

        try {
            await UserModel.query().where({id: req.tokenData.userId}).patch({healthDeclarationData: JSON.stringify(req.body)})
            // TODO: Logic that updates user model depending on the Health Declaration Form
            for (const [key, value] of Object.entries(vaccinationDeferralTriggers)) {
                if (req.body.includes(key) === value) {
                    // Defer vaccination
                    logger.log(`User ${req.tokenData.userId} vaccination is now deferred:`)
                    await UserModel.query().patch({ isDeferredFirst: true }).where({ id: req.tokenData.userId })
                    res.json({result: true, message: 'Submit successful!'})
                    return
                }
            }
            logger.log(`User ${req.tokenData.userId} vaccination is now not deferred:`)
            await UserModel.query().patch({ isDeferredFirst: false}).where({ id: req.tokenData.userId })
            res.json({result: true, message: 'Submit successful!'})
            return
        } catch(err) {
            console.error("Error occured while processing health declaration form submission: ", err)
            res.status(500).json({result: false, message: 'Something happened while trying to process your submission.'})
        }
    })

    app.get('/admin/healthDeclarationForm/:id', async (req, res) => {
        try {
            const data = (await UserModel.query().select('healthDeclarationData', 'firstName', 'middleName', 'lastName').where({id: req.params.id}))[0]
            res.json({result: true, data})
        } catch(err) {
            res.json({result: false, message: 'Error occurred while getting health declaration form submission.'})
            console.error("Error occured while getting health declaration form submission: ", err)
        }
    }) 
})();



