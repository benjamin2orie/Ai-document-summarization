
import { MetadataInterface } from "../interfaces/document-metadata.interface";

export class AnalyzeDocumentDto {
  summary: string;
  documentType: string;
  metadata: MetadataInterface;
}
