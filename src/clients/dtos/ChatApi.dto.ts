import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateIf,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

enum ChatApiEventTypes {
    START_SESSION = 'startSession',
    MESSAGE = 'message',
    END_SESSION = 'endSession',
    METADATA = 'metadata'
}

export enum AgentEventType {
    MESSAGE = 'message',
    ESCALATION_SUCCESS = 'escalationSuccess',
    ESCALATION_FAILED = 'escalationFailed',
    ESCALATION_QUEUE_UPDATE = 'escalationQueueUpdate',
    AGENT_DISCONNECT = 'agentDisconnect'
}

class MetaData {
    @IsString()
    public key: string;

    @IsString()
    public value: string;

    @IsOptional()
    @IsBoolean()
    public sanitize?: boolean;
}

export class ConverseWithBotRequestDto {
    // The ID that represents the conversation
    @IsNotEmpty()
    @IsString()
    public platformConversationId: string;

    // The event type sent by the client. It can be 'startSession', 'message', 'endSession' or 'metadata'.
    // Check our official documentation for more information about the API events.
    @IsEnum(ChatApiEventTypes)
    public eventType: ChatApiEventTypes;

    // Only valid when eventType is 'message'.
    // It will represent a single text message or a specific button text if the previous bot message was a list of buttons.
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public text?: string;

    // Only valid when eventType is 'message'.
    // It will represent the index of the selected card if the previous bot message was a carousel message.
    @IsOptional()
    @IsNumber()
    public cardIndex?: number;

    // Valid for all event types except 'endSession'.
    // It will represent a list of key-value pairs to be stored as session parameters in Ultimate session
    // They can be used to drive the dialogs or in actions
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MetaData)
    public metaData?: MetaData[];
}

export class MessageToWidgetRequestDto {
    // The event type sent by the client. It can be 'message', 'escalationSuccess', 'escalationFailed', 'escalationQueueUpdate' or 'agentDisconnect'.
    // Check our official documentation for more information about the API events.
    @IsEnum(AgentEventType)
    public eventType: AgentEventType;

    // The ID that represents the conversation
    @IsString()
    @IsNotEmpty()
    public platformConversationId: string;

    // Mandatory only valid when eventType is 'message'.
    // Represents the text to be sent to the widget
    @IsString()
    @IsNotEmpty()
    @ValidateIf((o) => o.eventType === AgentEventType.MESSAGE)
    public text?: string;

    // Only valid when eventType is 'escalationSuccess'.
    // Represents the name of the Agent that is going to take the conversation
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public agent?: string;

    // Only valid when eventType is 'escalationSuccess'.
    // Represents the avatar of the Agent that is going to take the conversation
    @IsOptional()
    public agentAvatar?: string;

    // Only valid when eventType is 'escalationQueueUpdate'.
    // Represents the position of the widget user in the queue for an agent
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public queuePosition?: string;

    // Only valid when eventType is 'escalationQueueUpdate'.
    // Represents the estimated waiting time for an agent
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public waitingTime?: string;
}
