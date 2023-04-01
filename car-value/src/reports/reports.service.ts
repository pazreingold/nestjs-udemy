import {Injectable} from '@nestjs/common';
import {CreateReportDto} from "./dtos/create-report.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Report} from "./report.entity";
import {Repository} from "typeorm";
import {User} from "../users/user.entity";

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repository: Repository<Report>) {
    }

    create(reportDto: CreateReportDto, user: User) {
        // @ts-ignore
        const report = this.repository.create(reportDto);
        report.user = user;

        return this.repository.save(report);
    }
}
