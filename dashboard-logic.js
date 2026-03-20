function handleChat() {
    
    let input = document.getElementById("userInput").value.trim()
    let chat = document.getElementById("chatBox")
    
    if (input === "") return
    
    chat.innerHTML += `<div class="msg user">${input}</div>`
    
    // example: ለአበበ 5000 ደረሰኝ
    
    let words = input.split(" ")
    
    let client = ""
    let amount = ""
    
    for (let w of words) {
        
        if (!isNaN(w)) {
            amount = w
        } else if (w !== "ደረሰኝ" && w !== "ለ") {
            client = w
        }
        
    }
    
    if (client && amount) {
        
        let invoiceId = "INV-" + Math.floor(Math.random() * 90000 + 10000)
        
        chat.innerHTML += `

<div class="invoice-card">

<b>Invoice</b><br><br>

Client: ${client}<br>
Amount: ${amount} ETB<br>
Invoice ID: ${invoiceId}

<button class="pdf-btn" onclick="downloadPDF('${invoiceId}','${client}','${amount}')">

Download PDF

</button>

</div>

`
        
    }
    
    document.getElementById("userInput").value = ""
    
}

// PDF

function downloadPDF(id, client, amount) {
    
    const { jsPDF } = window.jspdf
    
    const doc = new jsPDF()
    
    doc.setFontSize(18)
    doc.text("Contractor Enterprise Invoice", 20, 20)
    
    doc.setFontSize(12)
    
    doc.text("Invoice ID: " + id, 20, 40)
    doc.text("Client: " + client, 20, 50)
    doc.text("Amount: " + amount + " ETB", 20, 60)
    
    doc.save(id + ".pdf")
    
}
