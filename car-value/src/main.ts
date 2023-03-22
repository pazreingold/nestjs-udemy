import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        cookieSession({
        keys: ['xyzxyz'],
    }));
    app.useGlobalPipes(
        new ValidationPipe({
                whitelist: true
            }),
        );
    await app.listen(3000);
}

bootstrap();
