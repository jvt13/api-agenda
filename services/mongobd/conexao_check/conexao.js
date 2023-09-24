const mongoose = require('mongoose');
var data_base = "check_update";
var Schema = mongoose.Schema;
var table = null;

//function conexao() {
    mongoose.connect('mongodb+srv://root:102030@cluster0.jaybk0n.mongodb.net/' + data_base + '?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
        console.log('Conectado ao MongoDB com sucesso! ' + data_base);
        global.status_bd = "conectado";
    }).catch(function (err) {
        console.log(err.message);
        global.status_bd = "desconectado";
    });
//}

table = new Schema({
    id: String,
    status: String,
    origem: String
},{collection:'check_update'});

var check = mongoose.model("check_update", table);


module.exports = { mongoose, check };