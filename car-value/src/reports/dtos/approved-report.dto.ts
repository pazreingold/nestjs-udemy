import {IsBoolean} from "class-validator";

export class ApprovedReportDto {
    @IsBoolean()
    approved:boolean;
}
