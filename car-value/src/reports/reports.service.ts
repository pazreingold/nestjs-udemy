import {Injectable} from '@nestjs/common';
import {CreateReportDto} from "./dtos/create-report.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Report} from "./report.entity";
import {Repository} from "typeorm";

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repository: Repository<Report>) {
    }

    create(reportDto: CreateReportDto) {
        const report = this.repository.create(reportDto as any);

        return this.repository.save(report);
    }
}
