import {MiddlewareConsumer, Module, ValidationPipe} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {ReportsModule} from './reports/reports.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users/user.entity";
import {Report} from "./reports/report.entity";
import {APP_PIPE} from "@nestjs/core";
import {ConfigModule, ConfigService} from "@nestjs/config";
const cookieSession = require('cookie-session');

@Module({
    imports: [UsersModule, ReportsModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    type: 'sqlite',
                    database: config.get<string>('DB_NAME'),
                    synchronize: true,
                    entities: [User, Report],
                };
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
            })
        }
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(
                cookieSession({
                    keys: ['xyzxyz'],
                }),
            )
            .forRoutes('*');
    }
}
