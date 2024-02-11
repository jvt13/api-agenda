const mongoose = require('mongoose');
var data_base = "api";
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
    ano: String,
    mes: String,
    dta_vencimento: String,
    sem_vencimento: String,
    dta_inclusao: String,
    dados: String,
    tempo_dias: String,
    status: String
},{collection:'agenda'});

var agenda = mongoose.model("agenda", table);

table = new Schema({
    id: String,
    ano: String,
    mes: String,
    dta_vencimento: String,
    sem_vencimento: String,
    dta_inclusao: String,
    dados: String,
    tempo_dias: String,
    status: String,
    dta_baixa: String
},{collection:'concluidos'});

var baixa = mongoose.model("concluidos", table);

table = new Schema({
    id: String
},{collection:'check_update'});

var check_update = mongoose.model("check_update", table);

module.exports = { mongoose, agenda, baixa, check_update };