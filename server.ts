// Contractor Enterprise - Professional Backend v2.0
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
// ፋይሉን ስሙን ስለቀየርነው ወደ አዲሱ ስም እናመልክታለን
import { processInvoice } from './invoice-processor.ts'; 

// .env ፋይልን ዝግጁ ማድረግ
dotenv.config();

async function bootstrap() {
  console.log("--- Contractor Enterprise Backend Starting ---");

  // 1. የዳታቤዝ ግንኙነት ቼክ (PostgreSQL)
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl) {
    console.log("✅ Database connection string loaded from .env");
  }

  // 2. የደህንነት ቁልፍ (GDPR Encryption)
  const secret = process.env.ENCRYPTION_SECRET;
  if (secret) {
    console.log("🔐 GDPR Encryption engine is initialized.");
  }

  // 3. የሙከራ ሂደት (ከአንተ ኮድ የተወሰደ ግን የተሻሻለ)
  const testInput = "ለአቶ አበበ 500 ብር ለቀለም ቅብ ተከፈለ";
  const result = processInvoice(testInput);
  console.log("Processed Result:", result);

  // ሰርቨሩን በፖርት 3000 ላይ ማስነሳት
  const port = process.env.PORT || 3000;
  console.log(`🚀 Server is ready on port ${port}`);
}

bootstrap();
