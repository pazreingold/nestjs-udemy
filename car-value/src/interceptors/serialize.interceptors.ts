import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {plainToInstance} from "class-transformer";
import {UserDto} from "../users/dtos/user.dto";

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => {
                return plainToInstance(UserDto, data,
                    {
                        excludeExtraneousValues: true,
                    });
            })
        );
    }
}
