import Storage from 'node-persist';
import Config from "./interfaces/config";
import Logger from './logger';

const logger = Logger('Config')

export async function getConfig(): Promise<Config> {
    if (typeof Storage.get !== 'function') {
        await Storage.init({dir: 'tracvac-config'})
        logger.success('Configuration loaded!');
    }

    const config = await Storage.get('config') as Config;

    return {
        location: process.env.LOCATION ?? config?.location,
        lguUrl: process.env.LGUURL ?? config?.lguUrl,
        secret: process.env.SECRET ?? config?.secret,
        httpsPort: process.env.PORT_SECURE ?? config?.httpsPort ?? 443,
        httpPort: process.env.PORT ?? config?.httpPort ?? 80,
        adminPassword: process.env.ADMIN_PASSWORD,
    } as Config;
}

export async function isProperlyConfigured(): Promise<boolean> {
    const config = await getConfig() as Partial<Config>;

    return typeof config.httpPort === 'string' &&
        typeof config.httpsPort === 'string' &&
        typeof config.secret === 'string' &&
        typeof config.lguUrl === 'string' &&
        typeof config.location === 'string' &&
        typeof config.adminPassword === 'string'
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
