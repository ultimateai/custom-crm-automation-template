import { NextFunction, Request, Response } from 'express';
import { ActionWebhookDto } from './dtos/ActionWebhook.dto';
import _actionWebhookService, { ActionWebhookService } from '../services/ActionWebhook.service';

class ConverseWebhookController {
    constructor(private readonly actionWebhookService: ActionWebhookService = _actionWebhookService) {}

    /**
     * This method processes the Action Webhook. Receives a DTO of type ActionWebhookDto with the action details
     *
     * It responds with a DTO of type ActionWebhookResponseDto with any parameters that after the action execution
     * we want to store in the conversation session, so they can be used by the bot.
     *
     * @param req
     * @param res
     * @param next
     */
    public processAction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const requestBody: ActionWebhookDto = req.body;

        try {
            const response = this.actionWebhookService.processActionWebhookEvent(requestBody);
            res.status(200).send(response);
        } catch (error: any) {
            next(error);
        }
    };
}

export default new ConverseWebhookController();
