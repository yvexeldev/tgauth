import { bot } from './config/bot.js';
import { SERVER_PORT, database, server } from './config/index.js';
import './actions/index.js';
import { getCurrentTime } from './services/logger.js';

async function logError(message: string, error: unknown): Promise<void> {
    console.error(`${message}: ${error}`);
}

async function bootstrap(): Promise<void> {
    try {
        await database.authenticate({
            logging: false
        });
        console.log(`[${getCurrentTime()}] - Connection to the database has been established successfully.`);

        await database.sync({ force: true, logging: false });
        console.log(`[${getCurrentTime()}] - Models synced to the database successfully.`);
        server.listen(SERVER_PORT, () => {
            console.log(`[${getCurrentTime()}] - Server running on ${SERVER_PORT}-port!`);
        });
        console.log(`[${getCurrentTime()}] - Bot starting...`);
        await bot.start();
    } catch (error) {
        await logError(`[${getCurrentTime()}] - Error while cinitting the application`, error);
    }
}

bootstrap();
