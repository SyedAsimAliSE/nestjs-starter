import {Test, TestingModule} from '@nestjs/testing';
import {HttpStatus, INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {ValidationPipe} from '@nestjs/common/pipes/validation.pipe';
import {HttpExceptionFilter} from '../../src/common/filter/http-exception.filter';
import {AuthenticateDto} from "../../src/features/auth/dto/authenticate.dto";
import {AuthModule} from "../../src/features/auth/auth.module";

const authPayload: AuthenticateDto = {
    clientID: "ABCD"
};

describe('[Feature] auth - /v1/auth', () => {

    let app: INestApplication;

    beforeAll(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
                transformOptions: {
                    enableImplicitConversion: true,
                },
            }),
        );

        app.useGlobalFilters(new HttpExceptionFilter());

        await app.init();

    });

    it('Authenticate to OSDU API [POST /]', () => {
        return request(app.getHttpServer())
            .post('/v1/auth/')
            .send(authPayload as AuthenticateDto)
            .expect(HttpStatus.CREATED);
    });

    afterAll(async () => {
        await app?.close();
    });

});
