/**
 * Pag-Ibig specific module
 */

import { knex } from "../database";
import { app } from "../index";
import { UserModel as _ } from "../database/models/UserModel";

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

        try {
            await UserModel.query().patch({healthDeclarationData: JSON.stringify(req.body)})
            // TODO: Logic that updates user model depending on the Health Declaration Form
            for (const [key, value] of Object.entries(vaccinationDeferralTriggers)) {
                if (req.body.includes(key) === value) {
                    // Defer vaccination
                    await UserModel.query().patch({ isDeferredFirst: true }).where({ id: req.tokenData.userId })
                    res.json({result: true, message: 'Submit successful!'})
                    return
                }
            }
            res.json({result: true, message: 'Submit successful!'})
            return
        } catch(err) {
            console.error("Error occured while processing health declaration form submission: ", err)
            res.status(500).json({result: false, message: 'Something happened while trying to process your submission.'})
        }
    })

    app.get('/admin/healthDeclarationForm/:id', async (req, res) => {
        try {
            res.json((await UserModel.query().select('healthDeclarationData').where({id: req.params.id}))[0].healthDeclarationData)
        } catch(err) {
            console.error("Error occured while getting health declaration form submission: ", err)
        }
    }) 
})();



