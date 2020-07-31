const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    password: {
        type: String,
        required: [true, 'Debe ingresar una contraseña']
    }
});

//Este método se ejecuta siempre que hacemos una llamada a JSON del esquema
//Lo modificaremos para convertir nuestro JSON en un objeto y eliminar la propiedad password del mismo
usuarioSchema.methods.toJSON = function() {
    //Hay que aclarar que el .methods es propio del Mongoose para operar con schemas, no del Node
    let user = this;

    let userObject = user.toObject();

    delete userObject.password;

    return userObject;
}

module.exports = mongoose.model('Usuario', usuarioSchema);