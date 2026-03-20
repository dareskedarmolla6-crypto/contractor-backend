// Contractor Pro AI - Main Logic v1.3
import { extractInvoiceData } from './ai-extractor.service.ts';


// ይህ ፈንክሽን ከዌብሳይቱ የሚመጣውን መረጃ ይቀበላል
function startProcessing(userInput) {
  console.log("ኢንቮይስ እየተመረመረ ነው...");
  
  // 1. መረጃውን በ AI መለየት
  const result = extractInvoiceData(userInput);
  
  // 2. ውጤቱን ማሳየት
  console.log("ውጤት:", result);
  
  return result;
}

// ለሙከራ ያህል
const testInput = "ለአቶ አበበ 500 ብር ለቀለም ቅብ ተከፈለ";
startProcessing(testInput);
