require('./config/config');

const { Client } = require('whatsapp-web.js');
const client = require('../bot/acciones');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

mongoose.set('useFindAndModify', false);

const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('../controllers/indexControllers'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err
    else {
        console.log('Conexión exitosa a BD');
    }

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando peticiones en el puerto: ', process.env.PORT);
})

//client.initialize();
