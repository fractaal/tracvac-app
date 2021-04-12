import Logger from './logger'

const logger = Logger("Database Config")

export interface DatabaseConfig {
    host: string;
    user: string;
    port: number;
    password: string;
    database: string;
}

export function getDbConfig(): DatabaseConfig {
    if (
        process.env.DB_HOST &&
        process.env.DB_PASSWORD &&
        process.env.DB_PORT &&
        process.env.DB_USER
    ) {
        return {
            host: process.env.DB_HOST as string,
            password: process.env.DB_PASSWORD as string,
            port: process.env.DB_PORT as unknown as number,
            user: process.env.DB_USER as string,
            database: process.env.DB_NAME ?? 'tracvac-db' as string
        } as DatabaseConfig;
    } else {
        logger.error(`Database environment variables not set! Please set them before starting Tracvac Server.`);
        process.exit(1);
    }
}
