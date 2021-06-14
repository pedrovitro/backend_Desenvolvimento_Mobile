const mongoose = require('../../database');

const EstabelecimentoSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    descricao: {
        type: String,
        require: true
    }, 
    avaliacao: {
        type: Number,
        require: true
    }, 
    telefone: {
        type: String,
        require: true
    },
    endereco: {
        type: Strinig,
        require: true
    },
    reserva: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserva'
    }],
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