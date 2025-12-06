

export function fallbackClassifier(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes('invoice') || lower.includes('amount') || lower.includes('bill')) {
    return {
      type: 'invoice',
      metadata: {
        sender: extractSender(text),
        date: extractDate(text),
        totalAmount: extractAmount(text),
      },
    };
  }
  if (lower.includes('curriculum vitae') || lower.includes('resume') || lower.includes('experience')) {
    return {
      type: 'cv',
      metadata: {
        qualification: extractEducation(text),
        softSkills: extractSkills(text),
      },
    };
  }
  if (lower.includes('dear') || lower.includes('sincerely') || lower.includes('regards')) {
    return {
      type: 'letter',
      metadata: {
        sender: extractSender(text),
        recipient: extractRecipient(text),
        date: extractDate(text),
      },
    };
  }
  return { type: 'unknown', metadata: {} };
}

// Example stub functions — you can implement regex or NLP here
function extractSender(text: string) {
  const match = text.match(/(?:From|Sender)[:\s]+([^\n]+)/i);
  return match ? match[1].trim() : 'unknown';
}

function extractRecipient(text: string) {
  const match = text.match(/(?:To|Recipient)[:\s]+([^\n]+)/i);
  return match ? match[1].trim() : 'unknown';
}

function extractDate(text: string) {
  const match = text.match(/\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{4}-\d{2}-\d{2})\b/);
  return match ? match[1] : 'unknown';
}

function extractAmount(text: string) {
  const match = text.match(/(?:Total|Amount|Invoice)\s*[:\-]?\s*\$?([\d,]+\.?\d{0,2})/i);
  return match ? match[1] : 'unknown';
}

function extractEducation(text: string) {
  const match = text.match(/Education[:\s]+([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/i);
  return match ? match[1].trim() : 'unknown';
}

function extractSkills(text: string) {
  const match = text.match(/Skills[:\s]+([^\n]+)/i);
  return match ? match[1].split(/[,;]/).map(s => s.trim()) : ['unknown'];
}




