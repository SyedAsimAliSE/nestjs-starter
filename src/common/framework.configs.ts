import {NestExpressApplication} from "@nestjs/platform-express";
import {LoggerMiddleware} from "./middleware/logger.middleware";
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {HttpExceptionFilter} from "./filter/http-exception.filter";

export function applyNestJSConfigs(app: NestExpressApplication) {

    // FRAMEWORK CONFIGS
    app.use(LoggerMiddleware);
    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: false,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('ssm-osdu-wrapper')
        .setDescription('SSM OSDU wrapper API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Starts listening for shutdown hooks
    app.enableShutdownHooks();
}
