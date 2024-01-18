import { Application } from 'express';
import http from 'http';
import { createTerminus } from '@godaddy/terminus';
import 'dotenv/config';
import App from './app';
import { logger } from './utils/Logger.util';
import { ConverseWebhookRoute } from './routes/ConverseWebhook.route';
import { ActionWebhookRoute } from './routes/ActionWebhook.route';

const createServer = async (app: Application) => {
    const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

    return createTerminus(http.createServer(app), {
        signals: sigs,
        logger: logger.error,
        timeout: 60000,
        onSignal: async () => {
            logger.info('Server is shutting down.');
        }
    });
};

(async () => {
    const app = new App([new ConverseWebhookRoute(), new ActionWebhookRoute()]);
    await app.initializeApp();

    const application = app.getServer();
    const server = await createServer(application);

    const port = app.getPort();
    logger.info(`🚀 App listening on port ${port}`);
    server.listen(port);
})().catch((err) => logger.error('App could not be initialized', err));
