

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import * as https from 'https';
import { fallbackClassifier } from 'src/constant/fallbackClassifier';

@Injectable()
export class AnalysisService {
  constructor(private readonly configService: ConfigService) {}

  async analyze(text: string) {
    const GEMINI_API_KEY = this.configService.get<string>('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('Missing GEMINI_API_KEY in environment variables');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a strict document classifier and extractor.

Document text:
${text}

Instructions:
1. Classify the document type. Choose ONLY one from: "cv", "letter", "invoice". If none match, use "unknown".
2. Write a short summary (2–3 sentences).
3. Extract metadata as JSON:
   - For invoices: { "date": "...", "sender": "...", "totalAmount": "..." }
   - For CVs: { "name": "...", "skills": ["..."], "experienceYears": "..." }
   - For letters: { "date": "...", "sender": "...", "recipient": "..." }

Return ONLY valid JSON in this exact format:
{
  "summary": "...",
  "type": "cv|letter|invoice|unknown",
  "metadata": { ... }
}`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 30000,
        httpsAgent: new https.Agent({ keepAlive: false }),
      }
    );

    const output =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    let analysis;
    try {
      analysis = JSON.parse(output);
    } catch {
      analysis = { summary: output, type: 'unknown', metadata: {} };
    }

    // 🔑 Apply fallback if Gemini returns unknown or empty metadata
    if (
      analysis.type === 'unknown' ||
      !analysis.metadata ||
      Object.keys(analysis.metadata).length === 0
    ) {
      const fallback = fallbackClassifier(text);
      analysis.type = fallback.type;
      analysis.metadata = fallback.metadata;
    }

    return analysis;
  }
}






