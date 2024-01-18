import { ConverseWebhookDto } from '../controllers/dtos/ConverseWebhook.dto';
import { ConverseWebhookEventTypes } from '../types/enums/ConverseWebhook.enum';
import { logger } from '../utils/Logger.util';

export class ConverseWebhookService {
    constructor() {}

    /**
     * This method processes the Converse Webhook event.
     * @param converseWebhookDto
     */
    public processConverseWebhookEvent(converseWebhookDto: ConverseWebhookDto): void {
        switch (converseWebhookDto.data.eventType) {
            case ConverseWebhookEventTypes.SEND_MESSAGE:
                /**
                 * This event represents a message sent from the bot.
                 * It can represent a text message, a list of buttons or a carousel.
                 *
                 * The payload of this event is represented in the BotMessageEvent class.
                 *
                 * The request needs to be acknowledged and processed ASYNCHRONOUSLY.
                 */
                logger.info(
                    `Received ${ConverseWebhookEventTypes.SEND_MESSAGE} event: \n ${JSON.stringify(converseWebhookDto)}`
                );
                break;
            case ConverseWebhookEventTypes.ESCALATE:
                /**
                 * This event represents an escalation request from the bot.
                 *
                 * The payload of this event is represented in the BotEscalationEvent class.
                 *
                 * The request will be processed SYNCHRONOUSLY and respond if the escalation was successful (200) or not (4xx-5xx).
                 */
                logger.info(
                    `Received ${ConverseWebhookEventTypes.ESCALATE} event: \n ${JSON.stringify(converseWebhookDto)}`
                );
                break;
            case ConverseWebhookEventTypes.IS_TEAM_ONLINE:
                /**
                 * This event happens when the bot needs to make decisions that are dependent on the availability of human agents
                 *
                 * The payload of this event is represented in the BotIsTeamOnlineEvent class.
                 *
                 * The user will process the request and respond if there is availability or not using the class BotIsTeamOnlineEventResponse.
                 */
                logger.info(
                    `Received ${ConverseWebhookEventTypes.IS_TEAM_ONLINE} event: \n ${JSON.stringify(
                        converseWebhookDto
                    )}`
                );
                break;
            case ConverseWebhookEventTypes.WIDGET_ESCALATE:
                /**
                 * This event represents an escalation request from the bot for customers that are using Ultimate Chat Widget
                 *
                 * The payload of this event is represented in the BotWidgetMessageEvent class.
                 *
                 * The request will be acknowledged and then processed ASYNCHRONOUSLY.
                 */
                logger.info(
                    `Received ${ConverseWebhookEventTypes.WIDGET_ESCALATE} event: \n ${JSON.stringify(
                        converseWebhookDto
                    )}`
                );
                break;
            case ConverseWebhookEventTypes.WIDGET_MESSAGE:
                /**
                 * This event represents a message request from the user to an agent in an escalated conversation for customers that are using Ultimate Chat Widget
                 *
                 * The payload of this event is represented in the BotWidgetEscalateEvent class.
                 *
                 * The request will be acknowledged and then processed ASYNCHRONOUSLY.
                 */
                logger.info(
                    `Received ${ConverseWebhookEventTypes.WIDGET_MESSAGE} event: \n ${JSON.stringify(
                        converseWebhookDto
                    )}`
                );
                break;
            case ConverseWebhookEventTypes.WIDGET_END_SESSION:
                /**
                 * This event represents an end escalated session request from the user to an agent in an escalated conversation
                 * for customers that are using Ultimate Chat Widget
                 *
                 * The payload of this event is represented in the BotWidgetEndSessionEvent class.
                 *
                 * The request will be acknowledged and then processed ASYNCHRONOUSLY.
                 */
                logger.info(
                    `Received ${ConverseWebhookEventTypes.WIDGET_END_SESSION} event: \n ${JSON.stringify(
                        converseWebhookDto
                    )}`
                );
                break;
            default:
                break;
        }
    }
}

export default new ConverseWebhookService();
