import {Body, Controller, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from 'src/guards/auth.guard';
import {CreateReportDto} from "./dtos/create-report.dto";
import {ReportsService} from "./reports.service";
import {User} from "../users/user.entity";
import {CurrentUser} from "../users/decorators/current-user.decorator";
import {ReportDto} from "./dtos/report.dto";
import {Serialize} from "../interceptors/serialize.interceptors";
import {ApprovedReportDto} from "./dtos/approved-report.dto";
import {AdminGuard} from "../guards/admin.guard";
import {GetEstimateDto} from "./dtos/get-estimate.dto";

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approvedReport(@Param('id') id: string, @Body() body: ApprovedReportDto) {
        return this.reportsService.changeApproval(id, body.approved);
    }

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportsService.createEstimate(query);
    }
}
