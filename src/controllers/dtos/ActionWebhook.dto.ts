import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ActionDataParam {
    @IsNotEmpty()
    @IsString()
    key: string;

    @IsArray()
    value: any[];

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    saveAs?: string;
}
export class ActionWebhookDto {
    @IsNotEmpty()
    @IsString()
    platformConversationId: string;

    @IsNotEmpty()
    @IsString()
    botId: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ActionDataParam)
    data: ActionDataParam[];
}

export class ActionWebhookResponseDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ActionParameter)
    results: ActionParameter[];
}
export class ActionParameter {
    @IsNotEmpty()
    @IsString()
    key: string;

    @IsNotEmpty()
    value: any;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    sanitize?: boolean;
}
