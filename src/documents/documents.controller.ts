import { Controller, Post, Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { DocumentsSwagger } from './docs/swagger';
@Controller('documents')
@DocumentsSwagger.tags()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @DocumentsSwagger.upload()
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    return this.documentsService.upload(file);
  }

  @Post(':id/analyze')
  async analyzeDocument(@Param('id') id: string) {
    return this.documentsService.analyze(id);
  }

  @Get(':id')
  async getDocument(@Param('id') id: string) {
    return this.documentsService.getDocument(id);
  }
}
