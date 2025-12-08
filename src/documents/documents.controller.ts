import { Controller, Post, Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { DocumentsSwagger } from './docs/swagger';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { ApiResponse } from '@nestjs/swagger';
import { DocumentResponseDto } from './dto/document-response.dto';
import { AnalyzeDocumentDto } from './dto/analyse-document.dto';
@Controller('documents')
@DocumentsSwagger.tags()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @DocumentsSwagger.upload()
    @ApiResponse({
    status: 201,
    description: 'Document uploaded successfully',
    type: UploadDocumentDto, 
  })
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    return this.documentsService.upload(file);
  }

  @Post(':id/analyze')
  @ApiResponse({
    status: 202,
    description: 'Analysis started, check status later',
    type: AnalyzeDocumentDto,
  })
  async analyzeDocument(@Param('id') id: string): Promise<AnalyzeDocumentDto> {
    return this.documentsService.analyze(id);
  }
  
  @Get(':id/status')
  @ApiResponse({
    status: 200,
    description: 'Get current analysis status',
    type: DocumentResponseDto, 
  })
  async getStatus(@Param('id') id: string) {
    return this.documentsService.getDocument(id);
  }


  @Get(':id')
  async getDocument(@Param('id') id: string) {
    return this.documentsService.getDocument(id);
  }
}
