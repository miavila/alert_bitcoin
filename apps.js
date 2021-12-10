let ws = new WebSocket('wss://stream.binance.com:9443/ws/btceur@trade');
let stockPriceElement = document.getElementById('cryptoPrice');
let lastPrice =null;

function sendMail (lastPrice){
    var tempParams = {
        from_name: 'mia',
        to_name:'mia',
        message:lastPrice
    };
    emailjs.send('service_oiyosvf', 'Template ID', tempParams)
    .then(function(res){
        console.log("success", res.status);
    });
}

ws.onmessage =(event) => {
    let precioAlert = 50000
    let sotckObject = JSON.parse(event.data);
    let price = parseFloat(sotckObject.p).toFixed(2);
    stockPriceElement.innerText = price;
    stockPriceElement.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
    lastPrice = price;
    if (lastPrice < precioAlert){
        ws.close();
        sendMail(lastPrice);
        alert("El precio del Bitcoins es de: " + lastPrice + " ¿Buen precio para comprar?");
    }
}

