const client = require('./conexionWhatsapp');

const Persona = require('../models/personas');

client.on('ready', () => {
    console.log('Conexión realizada con éxito');
    setInterval(spammer, 5000);
    //spammer();
});

//acciones a realizar al recibir un mensaje
client.on('message', message => {

    message.getChat()
        .then(promesaChat => promesaChat)
        .then(chat => {
            var remitente = chat.name;
            console.log("\n========================");
            //console.log(chat);
            if (chat.isGroup) {
                console.log(`¡NUEVO MENSAJE DEL GRUPO ${remitente.toUpperCase()} !`);

            } else {
                console.log(`¡NUEVO MENSAJE PRIVADO DE ${remitente.toUpperCase()} !`);
            }
            console.log("========================");

            console.log("Mensaje: ", message.body);
            //console.log(message);
        })
        .catch(error => {
            console.log(error);
        });
});


function spammer() {

    Persona.find({ enviado: false })
        .limit(1)
        .exec(async (error, persona) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                })
            }

            if(persona.length <= 0){
                console.log('No se encuentran personas pendientes');
                return;
            }
            
            client.sendMessage(persona[0].numero + '@c.us', `¡Hola ${persona[0].nombre}!\nTe invito a participar de mi encuesta j3jjejje3`);
            
            //Modificamos el estado enviado de la persona una vez enviado el mensaje
            await Persona.findOneAndUpdate({ numero: persona[0].numero }, { enviado: true });

        })

}



module.exports = client;