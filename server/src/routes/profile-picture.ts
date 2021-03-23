import { app, staticPath } from '../';
import {v4 } from 'uuid';
import { UserModel } from "../database/models/UserModel";
import Logger from '../logger';
import path from 'path';
import {UploadedFile} from "express-fileupload";

const logger = Logger('Profile Picture Route');

app.post('/upload-profile-picture', async (request, response) => {
    if (request.isAuthenticated) {
        if (request.tokenData.userId) {
            const unique = v4();
            const img = request.files?.file as unknown as UploadedFile;

            if (img) {
                if (img.mimetype.toLowerCase().indexOf('image') !== -1) {
                    try {
                        const newPath = path.resolve(staticPath, unique);
                        await img.mv(newPath);
                        await UserModel.query().where({id: request.tokenData.userId}).patch({profilePicturePath: unique});
                        logger.log('Updated user profile picture for ' + request.tokenData.userId);
                        response.json({result: true})
                    } catch(err) {
                        logger.error(`Failed to update user profile picture for ${request.tokenData.userId} - ${err}`)
                        response.status(500).json({ result: false, message: 'Server error'});
                    }
                } else {
                    logger.log(`Failed to update user profile picture for ${request.tokenData.userId} - invalid file`)
                    response.status(400).json({result: false, message: 'Invalid file!'})
                }
            } else {
                logger.log(`Failed to update user profile picture for ${request.tokenData.userId} - no picture attached`)
                response.status(400).json({result: false, message: 'You didn\'t attach a picture!'});
            }

        } else {
            response.status(400).json({ result: false, message: 'Please reauthenticate' })
        }
    } else {
        response.status(400).json({ result: false, message: 'You are not authenticated' })
    }
})
