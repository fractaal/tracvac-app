/**
 * This module handles the initialization and loading of plugins.
 */
import path from 'path'
import fs from 'fs'
import Logger from './logger'

const logger = Logger("PluginManager")

interface TracVacPlugin {
	load (options: {
		Models: Record<string,any>,
		UserRegistrationFields: Record<string,any>,
		UserDataFields: Record<string,any>,
		App: Express.Application,
	}): void
	getManifest(): Record<string,any>
	getClientPlugin(): string
	getAdminPlugin(): string
}

const requiredManifestKeys = ['name', 'version']
const plugins: TracVacPlugin[] = [];
const pluginFolder = path.join(process.cwd(), 'plugins')

// Create a plugins folder if one doesn't exist
if (!fs.existsSync(pluginFolder)) fs.mkdirSync(pluginFolder)

const pluginFiles = fs.readdirSync(pluginFolder).filter(fileName => fileName.endsWith('.js'))

pluginFiles.forEach(fileName => {
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
			return
		}

	} catch(err) {
		logger.error(`Error occured while trying to load plugin @ ${fileName} - ${err}`)
		return
	}

	if (!(
		typeof plugin.load === 'function' &&
		typeof plugin.getAdminPlugin === 'function' &&
		typeof plugin.getClientPlugin === 'function'
	)) {
		logger.error(`Error occured while loading plugin ${manifest.name} - Does not satisfy interface`)
	}
	
})