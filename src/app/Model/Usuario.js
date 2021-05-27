const mongoose = require('../../database');

const UsuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    }, 
    reserva: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reseva'
    }
});


const Usuario = mongoose.model('Usuario', UsuarioSchema);
// Exportar o modelo
module.exports = Usuario;