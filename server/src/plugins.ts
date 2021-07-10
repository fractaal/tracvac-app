/**
 * This module handles the initialization and loading of plugins.
 */
import path from 'path'
import fs from 'fs'
import { app } from './index'
import Logger from './logger'
import { getConfig } from './config'

// Models
import { UserModel } from "./database/models/UserModel"
import { LogModel } from "./database/models/LogModel"
import { NotificationModel } from "./database/models/NotificationModel"
import { PushSubscriptionModel } from "./database/models/PushSubscriptionModel"

// Plugin Services
import * as UserRegistrationFields from "./user-registration-fields"
import * as UserDataFields from "./user-data-fields"
import * as Insight from "./insight"

const logger = Logger("PluginManager")

interface TracVacPlugin {
	load (options: {
		Models: Record<string,any>,
		UserRegistrationFields: Record<string,any>
		UserDataFields: Record<string,any>
		Insight: typeof Insight
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

const requiredManifestKeys = ['name']
const plugins: Record<string,any>[] = []
const clientPluginRoutes: string[] = []
const adminPluginRoutes: string[] = []

const pluginFolder = path.join(process.cwd(), 'plugins')

// Create a plugins folder if one doesn't exist
if (!fs.existsSync(pluginFolder)) fs.mkdirSync(pluginFolder)

const pluginFiles = fs.readdirSync(pluginFolder).filter(fileName => fileName.endsWith('.js'));

export const getLoadedPlugins = () => plugins;

(async () => {
	const adminEndpoint = (await getConfig()).adminEndpoint
	
	app.get("/plugin", async (req, res) => {
		res.json(clientPluginRoutes)
	})

	app.get(adminEndpoint + "/plugin", async (req, res) => { // TODO: Arbitrary admin endpoint
		res.json(adminPluginRoutes)
	})

	await Promise.all(pluginFiles.map(async (fileName: string) => {
		const plugin: TracVacPlugin = require(path.join(pluginFolder, fileName))

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
				Insight,
				app,
				logger: Logger(manifest.name + "Plugin")
			})

			// Expose the plugin's scripts as routes
			const clientPluginPath = path.resolve(plugin.getClientPlugin())
			const adminPluginPath = path.resolve(plugin.getAdminPlugin())

			if (fs.existsSync(clientPluginPath)) {
				const js = fs.readFileSync(clientPluginPath, { encoding: 'utf8' });
				clientPluginRoutes.push(`/plugin/${manifest.name}`)

				app.get(`/plugin/${manifest.name}`, async (req, res) => {
					res.type(".js").send(js)
				})
			} else if (!((clientPluginPath ?? "NONE") === "NONE")) {
				logger.warn(`The client plugin script for ${manifest.name} - ${clientPluginPath} - does not exist.  If this plugin has a front-end, it won't work properly!`)
			}

			if (fs.existsSync(adminPluginPath)) {
				const js = fs.readFileSync(adminPluginPath, { encoding: 'utf8' });
				adminPluginRoutes.push(adminEndpoint + `/plugin/${manifest.name}`) // TODO: Arbitrary admin endpoint

				app.get(adminEndpoint + `/plugin/${manifest.name}`, async (req, res) => { // TODO: Arbitrary admin endpoint
					res.type(".js").send(js)
				})
			} else if (!((adminPluginPath ?? "NONE") === "NONE")) {
				logger.warn(`The admin plugin script for ${manifest.name} - ${clientPluginPath} - does not exist. If this plugin has a front-end, it won't work properly!`)
			}
			
			plugin.__loaded = true

	
			plugins.push({...plugin, ...manifest})
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