import {Module} from '@nestjs/common';
import {ReportsController} from './reports.controller';
import {ReportsService} from './reports.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Report} from './report.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Report])],
    providers: [ReportsService],
    controllers: [ReportsController],
})
export class ReportsModule {
}
