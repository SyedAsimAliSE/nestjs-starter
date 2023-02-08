import {Logger} from "../utils/log4js";
import {NextFunction, Request, Response} from "express";

export function LoggerMiddleware(req: Request, res: Response, next: NextFunction) {

    const code = res.statusCode;

    const logFormat =
        ` ================================================================
            Request original url: ${req.originalUrl}
            Method: ${req.method}
            IP: ${req.ip}
            Status code: ${code}
            Headers: ${JSON.stringify(req.headers)}
            Params: ${JSON.stringify(req.params)}
            Query: ${JSON.stringify(req.query)}
            Body: ${JSON.stringify(req.body)} \n  
          ================================================================`;

    next();

    if (code >= 500) {
        Logger.error(logFormat);
    } else if (code >= 400) {
        Logger.warn(logFormat);
    } else {
        Logger.access(logFormat);
        Logger.log(logFormat);
    }
}
