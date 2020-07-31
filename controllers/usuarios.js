const express = require('express');

/* El bcrypt nos permitirá encriptar nuestras contraseñas con Hash */
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuarios');

const verificarToken = require('../middlewares/autenticacion');

const app = express();

app.post('/usuario', verificarToken, (req, res) => {
    let body = req.body;

    console.log(body);

    let usuario = new Usuario({
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10)
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        })


    })

});

module.exports = app;