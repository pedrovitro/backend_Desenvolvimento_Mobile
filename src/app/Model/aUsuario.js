const mongoose = require('../../database');

const UsuarioSchema = new mongoose.Schema({
    login: {
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