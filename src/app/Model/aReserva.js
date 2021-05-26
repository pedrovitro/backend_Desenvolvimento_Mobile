const mongoose = require('../../database');

const ReservaSchema = new mongoose.Schema({
    estabelecimento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estabelecimento',
        require: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    date: {
        type: String,
        require: true
    }
});

//precisa criar um campo pra hora ou ela ja ta junto com a data?

const Reserva = mongoose.model('Reserva', ReservaSchema);
// Exportar o modelo
module.exports = Reserva;