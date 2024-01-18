import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { AnswerOptionType, BotMessageType, ConverseWebhookEventTypes } from '../../types/enums/ConverseWebhook.enum';

class CarouselCard {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    imageUrl: string;
    @IsArray()
    buttons: Button[];
}

class Button {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmptyObject()
    type: AnswerOptionType;
}

/**
 * This class represents the base DTO for all events that the bot can send.
 * Contains the platformConversationId that identifies the conversation for both client and Ultimate.
 */
export abstract class BotEvent {
    @IsNotEmpty()
    @IsString()
    public platformConversationId: string;
}

/**
 * This class represents the request when the bot sends us a message. This message could be a text, a list of buttons or a carousel.
 */
export class BotMessageEvent extends BotEvent {
    // This property constant value is `sendMessage` for this event
    @IsEnum(ConverseWebhookEventTypes)
    public eventType: ConverseWebhookEventTypes.SEND_MESSAGE;

    // Internal Ultimate replyId if the message comes from a reply defined Ultimate's dashboard
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public replyId: string;

    // This property represents the type of message that the bot is sending.
    // It can be 'text' for text and button messages or 'carousel' for carousel messages.
    @IsEnum(BotMessageType)
    public type: BotMessageType;

    // The list of buttons that the bot is sending. This property can only be defined if the type is 'text'.
    @IsOptional()
    @IsArray()
    public buttons: Button[];

    @IsNumber()
    public confidence: number;

    @IsNotEmpty()
    @IsString()
    public text: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CarouselCard)
    public carouselCards?: CarouselCard[];

    @IsString()
    public messageId: string;
}

export class BotEscalationEvent extends BotEvent {
    // This property constant value is `escalate` for this event
    @IsEnum(ConverseWebhookEventTypes)
    public eventType: ConverseWebhookEventTypes.ESCALATE;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public escalateTo?: string;
}

export class BotIsTeamOnlineEvent extends BotEvent {
    // This property constant value is `isTeamOnline` for this event
    @IsEnum(ConverseWebhookEventTypes)
    public eventType: ConverseWebhookEventTypes.IS_TEAM_ONLINE;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public teamId?: string;
}

export class BotWidgetMessageEvent extends BotEvent {
    // This property constant value is `widgetMessage` for this event
    @IsEnum(ConverseWebhookEventTypes)
    public eventType: ConverseWebhookEventTypes.WIDGET_MESSAGE;

    @IsString()
    text!: string;
}

export class BotWidgetEscalateEvent extends BotEvent {
    // This property constant value is `widgetEscalate` for this event
    @IsEnum(ConverseWebhookEventTypes)
    public eventType: ConverseWebhookEventTypes.WIDGET_ESCALATE;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    escalateTo?: string;
}

export class BotWidgetEndSessionEvent extends BotEvent {
    // This property constant value is `widgetEndSession` for this event
    @IsEnum(ConverseWebhookEventTypes)
    public eventType: ConverseWebhookEventTypes.WIDGET_END_SESSION;
}

/**
 * This class represents the request that the bot sends to the converse webhook.
 * The data property will be different using the eventType as discriminator.
 */
export class ConverseWebhookDto {
    // Represents Ultimate's bot id.
    @IsString()
    public botId!: string;

    // This field will always be `chat` for this webhook.
    @IsString()
    public channel: string;

    @Type(() => BotEvent, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: 'eventType',
            subTypes: [
                { value: BotMessageEvent, name: ConverseWebhookEventTypes.SEND_MESSAGE },
                { value: BotEscalationEvent, name: ConverseWebhookEventTypes.ESCALATE },
                { value: BotIsTeamOnlineEvent, name: ConverseWebhookEventTypes.IS_TEAM_ONLINE },
                { value: BotWidgetMessageEvent, name: ConverseWebhookEventTypes.WIDGET_MESSAGE },
                { value: BotWidgetEscalateEvent, name: ConverseWebhookEventTypes.WIDGET_ESCALATE },
                { value: BotWidgetEndSessionEvent, name: ConverseWebhookEventTypes.WIDGET_END_SESSION }
            ]
        }
    })
    public data:
        | BotMessageEvent
        | BotEscalationEvent
        | BotIsTeamOnlineEvent
        | BotWidgetMessageEvent
        | BotWidgetEscalateEvent
        | BotWidgetEndSessionEvent;
}

export class BotIsTeamOnlineEventResponse {
    @IsBoolean()
    public isOnline: boolean;
}
