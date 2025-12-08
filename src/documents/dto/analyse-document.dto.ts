

import { ApiProperty } from '@nestjs/swagger';

export class AnalyzeDocumentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'processing', description: 'Current analysis status' })
  analysisStatus: 'pending' | 'processing' | 'completed' | 'failed';

  @ApiProperty({ example: 'Analysis started, check status later' })
  message: string;
}

