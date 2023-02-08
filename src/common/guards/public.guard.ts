import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Observable} from 'rxjs';

@Injectable()
export class PublicGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const routeHandler = context.getHandler();

        const isPublic = this.reflector.get<string>('isPublic', routeHandler);
        console.log('Current Route: isPublic', isPublic);

        return !!isPublic;
    }
}
