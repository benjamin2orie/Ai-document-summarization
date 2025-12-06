
import { MetadataInterface } from "../interfaces/document-metadata.interface";
export class DocumentResponseDto {
  id: string;
  fileName: string;
  storagePath: string;
  rawText: string;
  summary?: string;
  documentType?: string;
  metadata?: MetadataInterface;
}
