import { Router } from 'express';
import converseWebhookController from '../controllers/ConverseWebhook.controller';
import Route from './interfaces/Routes.interface';

export class ConverseWebhookRoute implements Route {
    public router = Router();
    public path: string = '/converse-webhook';

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}`, converseWebhookController.processEvent);
    }
}

export default new ConverseWebhookRoute();
