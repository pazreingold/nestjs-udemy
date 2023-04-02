import {MiddlewareConsumer, Module} from '@nestjs/common';
import {User} from './user.entity';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthService} from './auth.service';
import {CurrentUserMiddleware} from "./middlewares/current-user.middleware";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, AuthService]
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes('*');
    }
}
