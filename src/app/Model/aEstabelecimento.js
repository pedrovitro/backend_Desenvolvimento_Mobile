const mongoose = require('../../database');

const EstabelecimentoSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    descrição: {
        type: String,
        require: true
    }, 
    avaliação: {
        type: Number,
        require: true
    }, 
    reserva: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reseva'
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    cidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cidade'
    }
});


const Estabelecimento = mongoose.model('Estabelecimento', EstabelecimentoSchema);
// Exportar o modelo
module.exports = Estabelecimento;