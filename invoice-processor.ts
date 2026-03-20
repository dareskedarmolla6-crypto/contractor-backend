// Amharic AI Extraction Logic v1.3
export function extractInvoiceData(text) {
  // 1. ስምን መለየት (ከ 'ለ' ቀጥሎ ያሉትን ቃላት ለመያዝ)
  let nameMatch = text.match(/ለ\s*([\u1200-\u137F]+(?:\s+[\u1200-\u137F]+)?)/);
  const clientName = nameMatch ? nameMatch[1].trim() : "ያልታወቀ ደንበኛ";
  
  // 2. ዋጋን መለየት (ቁጥሮችን ብቻ በመፈለግ)
  let priceMatch = text.match(/\d+/);
  const amount = priceMatch ? priceMatch[0] : "0";
  
  // 3. የስራ አይነትን መለየት (Keyword matching)
  let jobType = "አጠቃላይ አገልግሎት";
  if (text.includes("ግንባታ")) jobType = "የግንባታ ስራ";
  else if (text.includes("ቀለም")) jobType = "የቀለም ቅብ";
  else if (text.includes("ቧንቧ")) jobType = "የቧንቧ ስራ";
  
  return {
    client: clientName,
    price: amount,
    job: jobType,
    status: "Pending",
    date: new Date().toISOString()
  };
}
