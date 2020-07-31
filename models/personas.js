const mongoose = require('mongoose')
require('mongoose-long')(mongoose);

const Schema = mongoose.Schema;

const personaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    numero : {
        type: String,
        required: [true, 'El numero es obligatorio'],
        unique: true,
        minlength: 10
        
    },
    enviado : {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Persona', personaSchema);