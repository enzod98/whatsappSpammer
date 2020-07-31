const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Persona = require('../models/personas');

const verificarToken = require('../middlewares/autenticacion');

// default options
app.use(fileUpload({ useTempFiles: true }));

app.post('/uploads', verificarToken, (req, res) => {
    let body = req.body;

    let numeroIngresado = parseInt(body.numero, 10);

    //validamos que el número ingresado sea válido
    if( body.numero != numeroIngresado || numeroIngresado < 1000000){
        return res.status(400).json({
            ok: false,
            message: "Se ingresó un número no válido, favor verifique"
        })
    }

    //inicializamos una nueva instancia del modelo Persona
    let persona = new Persona({
        nombre: body.nombre,
        numero: numeroIngresado
    })

    //Guardamos en la BD
    persona.save(async (err, personaDB) => {

        if (err) {
            //El código de error 11000 corresponderá a un número de teléfono duplicado en nuestra BD, por lo que procedemos a actualizarlo
            if (err.code === 11000) {
                let nombre = body.nombre;
                let numero = numeroIngresado;
                let filtro = { numero }
                let actualizar = { enviado: false, nombre } //los campos que vamos a actualizar con sus respectivos nuevos valores

                try {
                    let personaActualizada= await Persona.findOneAndUpdate(filtro, actualizar, {new: true});
                    
                    console.log('Se actualizaron datos de la BD');
                    return res.json({
                        ok: true,
                        message: 'Se actualizaron los datos de la persona',
                        persona: personaActualizada
                    });
                    
                } catch (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

            }
        }

        console.log('Se cargaron nuevos datos a la BD');
        return res.json({
            ok: true,
            message: 'Se agregó la persona a la BD',
            persona: personaDB
        });

    })



})

module.exports = app;