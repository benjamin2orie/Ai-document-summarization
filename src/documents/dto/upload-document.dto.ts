

import { ApiProperty } from '@nestjs/swagger';

export class UploadDocumentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'invoice.pdf' })
  fileName: string;

  @ApiProperty({ example: 's3://bucket/invoice.pdf' })
  storagePath: string;
}

