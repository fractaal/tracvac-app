import Storage from 'node-persist';
import Config from "./interfaces/config";
import Logger from './logger';

const logger = Logger('Config')

export async function getConfig(): Promise<Config> {
    if (typeof Storage.get !== 'function') {
        await Storage.init({dir: 'tracvac-config'}).then(() => logger.success('Configuration loaded!'));
    }
    return await Storage.get('config') as Config;
}

export async function setConfig(config: Config): Promise<boolean> {
    try {
        if (typeof Storage.get !== 'function') {
            await getConfig();
        }
        await Storage.set('config', config);
        return true;
    } catch (e) {
        logger.error('Failed to save configuration: ' + e);
        return false;
    }
}
