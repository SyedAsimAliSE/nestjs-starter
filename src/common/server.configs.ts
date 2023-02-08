import {NestExpressApplication} from "@nestjs/platform-express";
import helmet from "helmet";
import * as bodyParser from "body-parser";

export function applyServerConfigs(app: NestExpressApplication) {

    app.enable('trust proxy');
    app.disable('x-powered-by');
    app.use(helmet());

    /*app.use(
        helmet({
            contentSecurityPolicy:
                process.env.NODE_ENV === 'production' ? undefined : false,
        }),
    );*/

    app.use(helmet.xssFilter());
    app.use(helmet.frameguard({action: 'deny'}));
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(bodyParser.json({limit: '50mb'}));

    app.use(
        bodyParser.urlencoded({
            limit: '50mb',
            extended: true,
            parameterLimit: 50000,
        }),
    );

}
