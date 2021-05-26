const mongoose = require('../../database');

const FriendSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    accept:{
        type: Boolean,
        require:true
    }
});


const Friend = mongoose.model('Friend', FriendSchema);
// Exportar o modelo
module.exports = Friend;