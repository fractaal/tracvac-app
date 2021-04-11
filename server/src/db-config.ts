import Logger from './logger'

const logger = Logger("Database Config")

export interface DatabaseConfig {
    host: string;
    user: string;
    port: number;
    password: string;
}

export function getDbConfig(): DatabaseConfig {
    if (
        process.env.DB_HOST &&
        process.env.DB_PASSWORD &&
        process.env.DB_PORT &&
        process.env.DB_USER
    ) {
        return {
            host: String(process.env.DB_HOST),
            password: String(process.env.DB_PASSWORD),
            port: parseInt(process.env.DB_PORT),
            user: String(process.env.DB_USER),
        } as DatabaseConfig;
    } else {
        logger.error(`Database environment variables not set! Please set them before starting Tracvac Server.`);
        process.exit(1);
    }
}
