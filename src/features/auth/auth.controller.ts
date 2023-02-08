import {Body, Controller, Post, UseFilters} from '@nestjs/common';
import {ApiCreatedResponse, ApiTags} from '@nestjs/swagger';
import {AuthService} from "./auth.service";
import {AuthenticateDto} from "./dto/authenticate.dto";
import {Public} from "../../common/decorators/public.decorator";
import {HttpExceptionFilter} from "../../common/filter/http-exception.filter";

@ApiTags('auth')
@Controller('v1/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Public(true)
    @UseFilters(HttpExceptionFilter)
    @Post()
    @ApiCreatedResponse({type: AuthenticateDto})
    authenticate(@Body() authenticateDto: AuthenticateDto) {
        return this.authService.authenticate(authenticateDto);
    }


}
