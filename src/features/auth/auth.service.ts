import {Injectable} from '@nestjs/common';
import {AuthenticateDto} from "./dto/authenticate.dto";

@Injectable()
export class AuthService {

    authenticate(authenticateDto: AuthenticateDto) {
        return authenticateDto;
    }

}
