import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller';
import {CpuModule} from "../cpu/cpu.module";
import { DiskModule } from 'src/disk/disk.module';

@Module({
  imports: [CpuModule, DiskModule],
  controllers: [ComputerController]
})
export class ComputerModule {}
