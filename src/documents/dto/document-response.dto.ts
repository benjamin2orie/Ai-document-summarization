


import { ApiProperty } from '@nestjs/swagger';
import type { MetadataInterface } from "../interfaces/document-metadata.interface";

export class DocumentResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'resume.pdf' })
  fileName: string;

  @ApiProperty({ example: 's3://bucket/resume.pdf' })
  storagePath: string;

  @ApiProperty({ example: 'Extracted text from the document...' })
  rawText: string;

  @ApiProperty({ example: 'Candidate has 5 years of experience in software development.' })
  summary?: string;

  @ApiProperty({ example: 'cv', description: 'Document type classification' })
  documentType?: string;

  @ApiProperty({ example: { name: 'John Doe', skills: ['JavaScript', 'Python'], experienceYears: '5' } })
  metadata?: MetadataInterface;

  @ApiProperty({ example: '245.67 KB', description: 'File size in human-readable format' })
  fileSize?: string;

  @ApiProperty({ example: 'processing', description: 'Current analysis status' })
  analysisStatus?: 'pending' | 'processing' | 'completed' | 'failed';
}

