

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageService } from '../storage/storage.service';
import { TextExtractionService } from '../text-extraction/text-extraction.service';
import { AnalysisService } from '../analysis/analysis.service';
import { DocumentEntity } from './document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    private storageService: StorageService,
    private textExtractionService: TextExtractionService,
    private analysisService: AnalysisService,
    @InjectRepository(DocumentEntity)
    private documentsRepository: Repository<DocumentEntity>,
  ) {}

  async upload(file: Express.Multer.File) {
    const s3Path = await this.storageService.upload(file);
    const text = await this.textExtractionService.extract(file);

    const doc = this.documentsRepository.create({
      fileName: file.originalname,
      storagePath: s3Path,
      rawText: text,
      fileSize: file.size,
      analysisStatus: 'pending', // new field
    });

    await this.documentsRepository.save(doc);

    return { 
      id: doc.id,
      fileName: doc.fileName,
      storagePath: doc.storagePath,
      fileSize: file.size,
      documentType: doc.documentType,
      analysisStatus: doc.analysisStatus, // return status
    };
  }

  async analyze(id: string) {
    const doc = await this.getDocument(id);
    if (!doc) {
      throw new Error(`Document with id ${id} not found`);
    }

    // mark as processing immediately
    doc.analysisStatus = 'processing';
    await this.documentsRepository.save(doc);

    // Run analysis asynchronously (non-blocking)
    this.runAnalysisInBackground(doc);

    // return status immediately
    return {
      id: doc.id,
      analysisStatus: doc.analysisStatus,
      message: 'Analysis started, check status later',
    };
  }

  private async runAnalysisInBackground(doc: DocumentEntity) {
    try {
      const analysis = await this.analysisService.analyze(doc.rawText);

      doc.summary = analysis.summary;
      doc.documentType = analysis.type;
      doc.metadata = analysis.metadata;
      doc.analysisStatus = 'completed';
    } catch (err) {
      doc.analysisStatus = 'failed';
    }

    await this.documentsRepository.save(doc);
  }

  async getDocument(id: string) {
    return this.documentsRepository.findOneBy({ id });
  }
}

