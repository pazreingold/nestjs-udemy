import {Injectable, NotFoundException} from '@nestjs/common';
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

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repository.findOne({where: {id: parseInt(id)}});

        if(!report){
            throw new NotFoundException('Report not found');
        }

        report.approved = approved;
        return this.repository.save(report);
    }
}
