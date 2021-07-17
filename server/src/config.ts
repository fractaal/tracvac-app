import Logger from './logger';

export interface Config {
    // [x: string]: string;
    name: string;
    location: string;
    websiteUrl: string;
    secret: string;
    httpPort: string;
    httpsPort: string;
    adminEndpoint: string;
    adminPassword: string;
    adminUsername: string;
    isCorporation: boolean;
    email: string;
}

const requiredConfigKeys = ['name', 'location', 'httpPort', 'httpsPort', 'adminPassword', 'adminEndpoint', 'adminUsername', 'email'] as const

const logger = Logger('Config')

export async function getConfig(): Promise<Config> {
    const config = {
        name: process.env.NAME ,
        location: process.env.LOCATION ,
        websiteUrl: process.env.WEBSITE_URL ?? '',
        secret: process.env.SECRET ,
        httpsPort: process.env.PORT_SECURE ?? '443' ,
        httpPort: process.env.PORT ?? '80' ,
        adminEndpoint: process.env.ADMIN_ENDPOINT ,
        adminUsername: process.env.ADMIN_USERNAME ,
        adminPassword: process.env.ADMIN_PASSWORD ,
        isCorporation: !!process.env.IS_CORPORATION ,
        email: process.env.EMAIL 
    } as Partial<Config>;

    const missingKeys = requiredConfigKeys.filter(key => config[key] === undefined)

    if (missingKeys.length !== 0) {
        logger.error('Server is improperly configured! Check configuration and try again.')
        logger.error('Missing configuration keys : ', missingKeys)
        process.exit(1);
    }

    return config as Config;
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
