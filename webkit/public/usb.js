var port = null, writer = null, reader = null, str = "", isSetupFlag = false;

document.addEventListener('click', () => {
    if (!isSetupFlag) {
        isSetupFlag = true;
        RequestSerialIO();
    }
});

async function RequestSerialIO() {
    //try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200, dataBits: 8, stopBits: 1, parity: "none" });

        console.log(port);
        ReadUntilClosed();
        writer = port.writable.getWriter();
    //} catch (error) {
    //    console.error(error);
    //}
}

async function WriteToSerial(txt) {
    let arr = new Uint8Array(txt.length);
    for (let i = 0; i < arr.length; ++i) {
        arr[i] = txt.charCodeAt(i);
    }
    await writer.write(arr);
}

async function ReadUntilClosed() {
    while (port.readable) {
        try {
            reader = port.readable.getReader();
            while (true) {
                const { value, done } = await reader.read();

                let newStr = "";
                for (let i = 0; i < value.length; ++i) {
                    newStr += String.fromCharCode(value[i]);
                }

                str += newStr;
                if (str.indexOf('<') !== -1 && str.lastIndexOf('>') !== -1 &&
                    str.lastIndexOf('<') < str.lastIndexOf('>')) {
                    let startInx = str.lastIndexOf('<');
                    let diff = str.lastIndexOf('>') - startInx;
                    str = str.substring(startInx + 1, diff);
                }

                if (parseInt(str) >= 550) {
                    setInterval(() => {startPhoto(undefined)}, 1);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

// WebSocket usage in the browser
/*
const wss = new WebSocket('ws://localhost:8080');

wss.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
});

wss.addEventListener('message', (event) => {
    console.log('Received message from server:', event.data);
});

wss.addEventListener('close', () => {
    console.log('WebSocket connection closed');
});
*/