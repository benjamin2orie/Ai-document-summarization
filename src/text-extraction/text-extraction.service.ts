
import { Injectable, BadRequestException } from '@nestjs/common';
const pdfParse = require('pdf-parse'); 
import * as mammoth from 'mammoth';

@Injectable()
export class TextExtractionService {
  async extract(file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer || !file.mimetype) {
      throw new BadRequestException('Invalid file upload');
    }

    const mimetype = file.mimetype.toLowerCase();

    // PDF
    if (mimetype === 'application/pdf') {
      try {
        const data = await pdfParse(file.buffer);
        return data.text?.trim() ?? '';
      } catch (err) {
        throw new BadRequestException('Failed to parse PDF');
      }
    }

    // DOCX (common Word MIME)
    const isDocx =
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimetype.includes('word'); // fallback for some uploaders

    if (isDocx) {
      try {
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        return result.value?.trim() ?? '';
      } catch (err) {
        throw new BadRequestException('Failed to parse DOCX');
      }
    }

    // Plain text fallback
    const isText = mimetype.startsWith('text/');
    if (isText) {
      return file.buffer.toString('utf8').trim();
    }

    throw new BadRequestException(`Unsupported file type: ${mimetype}`);
  }
}
