const mongoose = require('../../database');

const CidadeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    categoria: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }],
    estabelecimento: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    }],
    
});

const Cidade = mongoose.model('Cidade', CidadeSchema);
// Exportar o modelo
module.exports = Cidade;