const mongoose = require('../../database');

const CategoriaSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    estabelecimento: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    }],
    
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);
// Exportar o modelo
module.exports = Categoria;