import axios from 'axios';
import { ConverseWithBotRequestDto, MessageToWidgetRequestDto } from './dtos/ChatApi.dto';
import { logger } from '../utils/Logger.util';

class ChatApiClient {
    constructor() {}

    /**
     * This method is used to send a message to the Chat API.
     * The event types that can be sent are: 'startSession', 'message', 'endSession' or 'metadata'.
     * @param requestBody
     */
    public async converseWithBot(requestBody: ConverseWithBotRequestDto): Promise<any | null> {
        /**
         * This code has to be used as an example to implement the Chat API client
         * API key security has to be implemented to protect the API
         * To get your API key, please contact the Ultimate team
         */
        const token = 'YOUR API KEY';
        const url = '/converse/chat';
        const headers = {
            headers: {
                Authorization: token
            }
        };
        let response = await axios.post(`${process.env.CHAT_API}${url}`, requestBody, headers);
        logger.info(`Api acknowledged the message with status code: ${response.status}`);
        return response;
    }

    /**
     * This method is only available for clients using Ultimate Chat Widget.
     * It is used to send agent escalated messages to the Chat API.
     * @param requestBody
     */
    public async converseWithEscalatedWidget(requestBody: MessageToWidgetRequestDto): Promise<any | null> {
        /**
         * This code has to be used as an example to implement the Chat API client
         * API key security has to be implemented to protect the API
         * To get your API key, please contact the Ultimate team
         */
        const token = 'YOUR API KEY';
        const url = '/agent/converse/send-message-to-widget';
        const headers = {
            headers: {
                Authorization: token
            }
        };
        let response = await axios.post(`${process.env.CHAT_API}${url}`, requestBody, headers);
        logger.info(`Api acknowledged the message with status code: ${response.status}`);
        return response;
    }
}

export default new ChatApiClient();
