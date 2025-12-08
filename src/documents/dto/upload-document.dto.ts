import { ApiProperty } from '@nestjs/swagger';

export class UploadDocumentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique document ID' })
  id: string;

  @ApiProperty({ example: 'invoice.pdf', description: 'Original file name' })
  fileName: string;

  @ApiProperty({ example: 's3://bucket/invoice.pdf', description: 'Storage path in S3' })
  storagePath: string;

  @ApiProperty({ example: '245.67 KB', description: 'File size in human-readable format' })
  fileSize: string; 

@ApiProperty({ example: 'cv', description: 'type of document uploaded' })
  documentType: string; 
}
