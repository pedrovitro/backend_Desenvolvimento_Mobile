const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://desmobile:pedropaulo@cluster0.xfws2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

module.exports = mongoose;



