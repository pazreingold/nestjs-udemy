import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateReportDto} from "./dtos/create-report.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Report} from "./report.entity";
import {Repository} from "typeorm";
import {User} from "../users/user.entity";
import {GetEstimateDto} from "./dtos/get-estimate.dto";

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

    createEstimate({make, model, lng, lat, year, mileage}: GetEstimateDto) {
        return this.repository
            .createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('make = :make', {make: make})
            .andWhere('model = :model', {model: model})
            .andWhere('lng - :lng BETWEEN -5 AND 5', {lng})
            .andWhere('lat - :lat BETWEEN -5 AND 5', {lat})
            .andWhere('year - :year BETWEEN -3 AND 3', {year})
            .andWhere('approved IS TRUE')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({mileage})
            .limit(3)
            .getRawOne();
    }
}
