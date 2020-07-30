const { Client } = require('whatsapp-web.js');
const client = require('../controllers/acciones');

const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const express = require('express');
const app = express();


app.use(require('../controllers/uploads'));

mongoose.connect('mongodb://localhost:27017/persona', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err
    else {
        console.log('Conexión exitosa a BD');
    }

});

app.listen(3000, () => {
    console.log('Escuchando peticiones en el puerto: ', 3000);
})

client.initialize();
