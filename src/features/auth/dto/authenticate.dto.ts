import {ApiProperty} from '@nestjs/swagger';

export class AuthenticateDto {

    @ApiProperty({required: true})
    clientID: string;

    @ApiProperty({required: false, default: 'azure'})
    osduEnv?: string;

}
