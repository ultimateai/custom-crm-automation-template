import { NextFunction, Request, Response } from 'express';
import { ConverseWebhookDto } from './dtos/ConverseWebhook.dto';
import _converseWebhookService, { ConverseWebhookService } from '../services/ConverseWebhook.service';

class ConverseWebhookController {
    constructor(private readonly converseWebhookService: ConverseWebhookService = _converseWebhookService) {}

    /**
     * This method processes the Converse Webhook. Receives a DTO of type ConverseWebhookDto with the event details
     *
     * It will process the request differently depending on the eventType field of the payload.
     *
     * @param req
     * @param res
     * @param next
     */
    public processEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const requestBody: ConverseWebhookDto = req.body;

        try {
            this.converseWebhookService.processConverseWebhookEvent(requestBody);
            res.status(200).send();
        } catch (error: any) {
            next(error);
        }
    };
}

export default new ConverseWebhookController();
