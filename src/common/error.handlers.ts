import {NestExpressApplication} from "@nestjs/platform-express";
import {Logger} from "./utils/log4js";

export function handleUnexpectedErrors(app: NestExpressApplication) {

    process.on('uncaughtException', (err) => {

        Logger.error(`❌ Uncaught Exception`, err);

        // log the error in a permanent storage
        // attempt a graceful shutdown
        app.close().then(() => {
            process.exit(1); // then exit
        });

        // If a graceful shutdown is not achieved after 1 second,
        // shut down the process completely
        setTimeout(() => {
            process.abort(); // exit immediately and generate a core dump file
        }, 1000).unref();
    });

    process.on('unhandledRejection', (reason) => {

        Logger.error(`❌ Unhandled Rejection`, reason);

        app.close().then(() => {
            process.exit(1); // then exit
        });

        setTimeout(() => {
            process.abort();
        }, 1000).unref();
    });
}
