/**
 * Pag-Ibig specific module
 */

import { knex } from "../database";
import { app } from "../index";
import { UserModel as _ } from "../database/models/UserModel";

// Pag-Ibig related data
class UserModel extends _ {
    isDeferredFirst!: boolean;
    isDeferredSecond!: boolean;
    healthDeclarationData!: Record<string,any>;
}

(async () => {
    // Perform schema changes to the user table
    await knex.schema.table('users', table => {
        table.boolean('isDeferredFirst')
        table.boolean('isDeferredSecond')
        table.json('healthDeclarationData')
    })

    app.post('/healthDeclarationForm', async (req, res) => {
        // TODO: Logic that updates user model depending on the Health Declaration Form
    })

})();



