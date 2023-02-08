import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./features/auth/auth.module";
import {APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {PublicGuard} from "./common/guards/public.guard";
import {MapResponseInterceptor} from "./common/interceptors/map-response.interceptor";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${
                process.env.NODE_ENV === "development" ? "dev" : "prod"
            }`,
            // ignoreEnvFile: true,
        }),
        AuthModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: PublicGuard
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: MapResponseInterceptor
        }
    ],
})
export class AppModule {
}
