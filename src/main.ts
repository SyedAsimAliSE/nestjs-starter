import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {Logger} from "./common/utils/log4js";
import {applyServerConfigs} from "./common/server.configs";
import {applyNestJSConfigs} from "./common/framework.configs";
import {handleUnexpectedErrors} from "./common/error.handlers";

const bootstrap = async () => {

    try {
        console.log('ACTIVE ENVIRONMENT :', process.env.NODE_ENV);

        const app = await NestFactory.create<NestExpressApplication>(AppModule, {
            bufferLogs: false,
            autoFlushLogs: true
        });

        applyServerConfigs(app);
        applyNestJSConfigs(app);
        handleUnexpectedErrors(app);

        await app.listen(process.env.PORT);

    } catch (error) {
        Logger.error(`❌  ERROR STARTING SERVER`, error);
        process.exit();
    }
};

(async () => {
    bootstrap().then(() =>
        Logger.log(`SERVER IS RUNNING AT PORT ${process.env.PORT}`),
    );
})();
