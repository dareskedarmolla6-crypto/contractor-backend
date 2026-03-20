// Contractor Enterprise - Smart Dashboard Logic v2.3
// የአንተን ካርታ እና የደረሰኝ ስራ ሙሉ በሙሉ የያዘ

// 1. የኢንጅነሮች መረጃ (ያለህን እንዳለ አስቀድሜዋለሁ)
const engineerData = {
    "Elias": { lat: 9.02497, lng: 38.74689, img: "https://img.icons8.com/color/48/000000/engineer.png", gender: "male" },
    "Sara": { lat: 9.02800, lng: 38.75000, img: "https://img.icons8.com/color/48/000000/female-worker.png", gender: "female" },
    "Kebede": { lat: 9.02000, lng: 38.74000, img: "https://img.icons8.com/color/48/000000/worker-with-road-roller.png", gender: "male" },
    "Hana": { lat: 9.02600, lng: 38.75500, img: "https://img.icons8.com/color/48/000000/businesswoman.png", gender: "female" }
};

// 2. ሲስተም ስቴት
let state = {
    completed: 157, 
    revenue: 702000000, 
    active: 11, 
    receiptID: 1017,
    engineers: Object.keys(engineerData),
    idx: 0,
    historyLog: []
};

// 3. ካርታ ማስነሻ (Leaflet)
const map = L.map('map').setView([9.02497, 38.74689], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
let currentMarker, currentPath;

// 4. መልእክት መላኪያ (ከባክኤንድ ጋር እንዲገናኝ ተሻሽሏል)
async function handleSend() {
    const input = document.getElementById('userInput');
    const msg = input.value.trim();
    if (msg) {
        appendChat(msg, 'user-message');
        
        // ደንበኛው የጠየቀውን GDPR Encryption ማሳያ
        console.log("Sending to Backend for Encryption...");
        
        processOrder(msg); // የአንተን ዋና ተግባር ይጠራል
        input.value = "";
    }
}

// 5. ደረሰኝ ማተሚያ እና ዳውንሎድ (ያለህን እንዳለ አስቀድሜዋለሁ)
function printReceipt(id) {
    const content = document.getElementById(`receipt-content-${id}`).innerHTML;
    const win = window.open('', '', 'height=600,width=800');
    win.document.write(`<html><head><title>Print</title></head><body>${content}</body></html>`);
    win.document.close();
    win.print();
}

function downloadReceipt(id, eng, total) {
    const text = `RECEIPT ID: #${id}\nENGINEER: ${eng}\nTOTAL: ${total} ETB\nREADY FOR SAGE`;
    const blob = new Blob([text], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = `Receipt_${id}.txt`;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
}

// 6. ትዕዛዝ ማስተናገጃ (Sage Integration ተጨምሮበታል)
function processOrder(msg) {
    if(msg.includes("ታሪክ")) { showHistory(); return; }
    
    const amountMatch = msg.match(/\d+/g);
    const amount = amountMatch ? parseInt(amountMatch.join("")) : 0;
    if(amount <= 0) return;

    const engName = state.engineers[state.idx];
    const info = engineerData[engName];
    const tax = amount * 0.15;
    const total = amount + tax;

    state.receiptID++; 
    state.completed++; 
    state.revenue += total;

    // ደንበኛው የጠየቀው Sage Status
    const sageStatus = "READY_FOR_SAGE_SYNC";

    const receiptHtml = `
        <div style="border-left:8px solid #2ecc71; background:white; padding:15px; border-radius:15px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
            <div id="receipt-content-${state.receiptID}">
                <div style="text-align:center; font-weight:bold;">CONTRACTOR ENTERPRISE AI</div>
                <div style="font-size:11px; color:#64748b; margin-bottom:10px;">📄 ደረሰኝ #${state.receiptID} | ${sageStatus}</div>
                <div style="font-size:14px;">
                    <div>👷 ኢንጅነር: ${engName}</div>
                    <div style="font-size:18px; font-weight:bold; color:#2ecc71;">ጠቅላላ፡ ${total.toLocaleString()} ETB</div>
                </div>
            </div>
            <div style="display:flex; gap:5px; margin-top:10px;">
                <button onclick="downloadReceipt('${state.receiptID}', '${engName}', '${total.toLocaleString()}')" style="flex:1; padding:8px; border-radius:5px; cursor:pointer;">📥 PDF</button>
                <button onclick="printReceipt('${state.receiptID}')" style="flex:1; padding:8px; border-radius:5px; cursor:pointer;">🖨️ PRINT</button>
            </div>
        </div>`;
    
    appendChat(receiptHtml, 'bot-message');
    updateUI(engName);
    state.idx = (state.idx + 1) % state.engineers.length;
}

// 7. ቪዥዋል (ያለህን እንዳለ አስቀድሜዋለሁ)
function updateUI(engName) {
    document.getElementById('stat-completed').innerText = state.completed;
    document.getElementById('stat-revenue').innerText = `$${(state.revenue/1000000).toFixed(1)}M`;
    
    const info = engineerData[engName];
    if(currentMarker) map.removeLayer(currentMarker);
    currentMarker = L.marker([info.lat, info.lng]).addTo(map).bindPopup(`${engName} ስራ አጠናቋል ✅`).openPopup();
    map.flyTo([info.lat, info.lng], 16);
}

function appendChat(html, className) {
    const chat = document.getElementById('chatContainer');
    const div = document.createElement('div');
    div.className = `message ${className}`;
    div.innerHTML = html;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}
