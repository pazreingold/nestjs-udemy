import {CallHandler, ExecutionContext, NestInterceptor, UseInterceptors} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {plainToInstance} from "class-transformer";

interface ClassConstructor {
    new(...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data,
                    {
                        excludeExtraneousValues: true,
                    });
            })
        );
    }
}
