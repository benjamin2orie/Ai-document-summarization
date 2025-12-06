
import {MetadataInterface}  from './document-metadata.interface'

export interface DocumentInterface {
  id: string;
  fileName: string;
  storagePath: string;
  rawText: string;
  summary?: string;
  documentType?: string;
  metadata?: MetadataInterface;
}
