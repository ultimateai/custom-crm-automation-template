import { ActionWebhookDto, ActionWebhookResponseDto } from '../controllers/dtos/ActionWebhook.dto';
import { logger } from '../utils/Logger.util';

export class ActionWebhookService {
    constructor() {}

    /**
     * This method processes the Action Webhook.
     * @param actionWebhookDto
     */
    public processActionWebhookEvent(actionWebhookDto: ActionWebhookDto): ActionWebhookResponseDto {
        logger.info(`Received ${actionWebhookDto.name} action: \n ${JSON.stringify(actionWebhookDto)}`);
        const actionWebhookResponseDto: ActionWebhookResponseDto = {
            results: [
                {
                    key: 'variable1',
                    value: 'value1'
                }
            ]
        };
        return actionWebhookResponseDto;
    }
}

export default new ActionWebhookService();
