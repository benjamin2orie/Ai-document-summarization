

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { DocumentEntity } from '../documents/document.entity';
import { StorageModule } from '../storage/storage.module';
import { TextExtractionModule } from '../text-extraction/text-extraction.module';
import { AnalysisModule } from '../analysis/analysis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentEntity]),
    StorageModule,          
    TextExtractionModule,
    AnalysisModule,
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}

