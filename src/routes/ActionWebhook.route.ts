import { Router } from 'express';
import Route from './interfaces/Routes.interface';
import actionWebhookController from '../controllers/ActionWebhook.controller';

export class ActionWebhookRoute implements Route {
    public router = Router();
    public path = '/action-webhook';

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}`, actionWebhookController.processAction);
    }
}

export default new ActionWebhookRoute();
