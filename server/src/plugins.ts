/**
 * This module handles the initialization and loading of plugins.
 */
import path from 'path'
import fs from 'fs'
import { app } from './index'
import Logger from './logger'

// Models
import { UserModel } from "./database/models/UserModel"
import { LogModel } from "./database/models/LogModel"
import { NotificationModel } from "./database/models/NotificationModel"
import { PushSubscriptionModel } from "./database/models/PushSubscriptionModel"

// Plugin Services
import * as UserRegistrationFields from "./user-registration-fields"
import * as UserDataFields from "./user-data-fields"

const logger = Logger("PluginManager")

interface TracVacPlugin {
	load (options: {
		Models: Record<string,any>,
		UserRegistrationFields: Record<string,any>
		UserDataFields: Record<string,any>
		app: Express.Application
		logger: ReturnType<typeof Logger>
	}): Promise<void>
	getManifest(): Record<string,any>
	getClientPlugin(): string
	getAdminPlugin(): string
	
	// These values are injected by TracVac on load
	__loaded: boolean
	__errored: boolean
}

const requiredManifestKeys = ['name', 'version']
const plugins: TracVacPlugin[] = [];
const pluginFolder = path.join(process.cwd(), 'plugins')

// Create a plugins folder if one doesn't exist
if (!fs.existsSync(pluginFolder)) fs.mkdirSync(pluginFolder)

const pluginFiles = fs.readdirSync(pluginFolder).filter(fileName => fileName.endsWith('.js'));

(async () => {
	await Promise.all(pluginFiles.map(async (fileName: string) => {
		const plugin: TracVacPlugin = require(path.join(pluginFolder, fileName))
		plugins.push(plugin)

		let manifest: Record<string,any>

		try {
			manifest = plugin.getManifest()
		
			const goodManifest = requiredManifestKeys.reduce((acc, curr) => {
				const result = curr in manifest && acc ? true : false
				if (!result) logger.error(`Bad manifest - misisng key ${curr}`)
				return result
			}, true)
			
			if (!goodManifest) {
				logger.error(`Error occured while trying to load plugin ${fileName} - Bad manifest`)
				plugin.__errored = true
				return
			}

		} catch(err) {
			logger.error(`Error occured while trying to load plugin @ ${fileName} - ${err}`)
			plugin.__errored = true
			return
		}

		if (!(
			typeof plugin.load === 'function' &&
			typeof plugin.getAdminPlugin === 'function' &&
			typeof plugin.getClientPlugin === 'function'
		)) {
			logger.error(`Error occured while loading plugin ${manifest.name} - Does not satisfy interface`)
			plugin.__errored = true
			return
		}

		// All checks passed, load the plugin
		try {

			await plugin.load({
				Models: {
					UserModel,
					LogModel,
					NotificationModel,
					PushSubscriptionModel
				}, 
				UserDataFields,
				UserRegistrationFields,
				app,
				logger: Logger(manifest.name)
			})

			plugin.__loaded = true
		} catch(err) {
			logger.error(`Error occured while loading the plugin ${manifest.name} - Load method call failed - ${err}`)
			plugin.__loaded = false
			plugin.__errored = true
		}
	}))

	const numErrored = plugins.reduce((acc, curr) => { return curr.__errored ? ++acc : acc }, 0)
	const numLoaded = plugins.reduce((acc, curr) => { return curr.__loaded? ++acc : acc }, 0)

	if (numErrored) logger.warn(
		`${numErrored} plugins failed to load. 
		Tracvac may experience undefined behavior if continued to run.`
	)
	if (numLoaded) logger.success(`${numLoaded} plugins loaded successfully.`)
})();