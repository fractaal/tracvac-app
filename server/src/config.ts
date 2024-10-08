import Logger from './logger';

export interface Config {
    // [x: string]: string;
    name: string;
    location: string;
    websiteUrl: string;
    secret: string;
    httpPort: string;
    httpsPort: string;
    adminPort: string;
    adminEndpoint: string;
    adminPassword: string;
    adminUsername: string;
    adminIp: string;
    isCorporation: boolean;
    email: string;
}

const requiredConfigKeys = [
    'name', 
    'location', 
    'httpPort', 
    'httpsPort', 
    'adminPassword', 
    'adminEndpoint', 
    'adminUsername', 
    'adminIp', 
    'adminPort',
    'email'] as const

const logger = Logger('Config')

export async function getConfig(): Promise<Config> {
    const config = {
        name: process.env.NAME ,
        location: process.env.LOCATION ,
        websiteUrl: process.env.WEBSITE_URL ?? '',
        secret: process.env.SECRET ,
        httpsPort: process.env.PORT_SECURE ?? process.env.HTTPS_PORT ?? '443' ,
        httpPort: process.env.PORT ?? process.env.HTTP_PORT ?? '80' ,
        adminPort: process.env.ADMIN_PORT ,
        adminEndpoint: process.env.ADMIN_ENDPOINT ,
        adminUsername: process.env.ADMIN_USERNAME ,
        adminPassword: process.env.ADMIN_PASSWORD ,
        adminIp: process.env.ADMIN_IP ,
        isCorporation: !!process.env.IS_CORPORATION ,
        email: process.env.EMAIL 
    } as Partial<Config>;

    const missingKeys = requiredConfigKeys.filter(key => config[key] === undefined)

    if (missingKeys.length !== 0) {
        logger.error('Server is improperly configured! Check configuration and try again.')
        logger.error('Missing configuration keys : ', missingKeys)
        logger.error(
            `
            Missing configuration keys are displayed in camelCase, 
            but they should be defined in the .env file in 
            UPPER_CASE_SNAKE_CASE.
            
            e.g. - httpPort becomes HTTP_PORT
            e.g. - adminIp becomes ADMIN_IP`
            )
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
