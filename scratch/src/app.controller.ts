import {Controller, Get} from "@nestjs/common";

@Controller('app')
export class AppController {
    @Get('/root')
    getRootRoute() {
        return 'hi there!';
    }

    @Get('bye')
    getByeThere() {
        return 'Bye there!';
    }
}
