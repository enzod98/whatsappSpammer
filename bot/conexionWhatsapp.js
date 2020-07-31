const fs = require('fs');
const qrcode = require('qrcode-terminal');
const path = require('path')

const { Client } = require('whatsapp-web.js');

const rutaSesion = path.resolve(__dirname, "../server/token/sesion.json");

let datosSesion;
if (fs.existsSync(rutaSesion)) {
    datosSesion = require(rutaSesion);
}

const client = new Client({
    session: datosSesion
});


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR generado: ', qr);
});

client.on('authenticated', (session) => {
    // Save the session object however you prefer.
    // Convert it to json, save it to a file, store it in a database...
    datosSesion = session;
    fs.writeFile(rutaSesion, JSON.stringify(session), function(err) {
        if (err) {
            console.error(err);
        }
    });
});



module.exports = client;