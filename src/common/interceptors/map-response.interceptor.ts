import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {Logger} from "../utils/log4js";

@Injectable()
export class MapResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const req = context.switchToHttp().getRequest();

        return next
            .handle()
            .pipe(
                map((data) => {

                    const logFormat =
                        ` ================================================================
                          Request original url: ${req.originalUrl}
                          Method: ${req.method}
                          IP: ${req.ip}
                          Response data: ${JSON.stringify(data)} \n 
                          ================================================================`;

                    Logger.info(logFormat);
                    Logger.access(logFormat);

                    return {
                        data
                    };

                })
            );
    }
}
