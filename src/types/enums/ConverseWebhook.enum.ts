export enum ConverseWebhookEventTypes {
    SEND_MESSAGE = 'sendMessage',
    ESCALATE = 'escalate',
    IS_TEAM_ONLINE = 'isTeamOnline',
    WIDGET_MESSAGE = `widgetMessage`,
    WIDGET_ESCALATE = `widgetEscalate`,
    WIDGET_END_SESSION = `widgetEndSession`
}

export enum BotMessageType {
    TEXT = 'text',
    CAROUSEL = 'carousel'
}

export enum AnswerOptionType {
    BUTTON = 'button',
    LINK = 'link'
}
