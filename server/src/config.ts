import Logger from './logger';

export interface Config {
    location: string;
    lguUrl: string;
    secret: string;
    httpPort: string;
    httpsPort: string;
    adminPassword: string;
}

const logger = Logger('Config')

export async function getConfig(): Promise<Config> {
    const config = {
        location: process.env.LOCATION ,
        lguUrl: process.env.LGUURL ,
        secret: process.env.SECRET ,
        httpsPort: process.env.PORT_SECURE ?? 443 ,
        httpPort: process.env.PORT ?? 80 ,
        adminPassword: process.env.ADMIN_PASSWORD ,
    } as Partial<Config>;

    if (typeof config.httpPort === 'string' &&
        typeof config.httpsPort === 'string' &&
        typeof config.secret === 'string' &&
        typeof config.lguUrl === 'string' &&
        typeof config.location === 'string' &&
        typeof config.adminPassword === 'string') {
        return config as Config;
    } else {
        logger.error('Server is improperly configured! Check configuration and try again.')
        process.exit(1);
    }
}

/**
 * @deprecated The browser should not be able to change the server configuration anymore
 */
export async function setConfig(config: Config): Promise<boolean> {
    try {
        return false;
    } catch (e) {
        logger.error('Failed to save configuration: ' + e);
        return false;
    }
}
