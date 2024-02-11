const con = require('./conexao');

async function insert(id_, ano_, mes_, dta_venc, sem_venc, dta_incl, dados_, tempo, status) {
    //console.log("Data: " +ano_ +" "+ mes_)
    await con.agenda.create({
        id: id_,
        ano: ano_,
        mes: mes_,
        dta_vencimento: dta_venc,
        sem_vencimento: sem_venc,
        dta_inclusao: dta_incl,
        dados: dados_,
        tempo_dias: tempo,
        status: status
});
}

async function select() {

    const ret = await con.agenda.find();

    if (ret) {
        return ret;
    }
    return 0;
}

async function baixa(){
    
    //const ret = await con.con
}

async function update(id, parametro) {
    var dta = new Date();
    const filter = { _id: id };
    var query = {};
    if (parametro == null) {
        query = { data_hora: dta.getHours() + ":" + dta.getMinutes() + ":" + dta.getSeconds() };
    } else {
        query = { data_hora: "" };
    }

    const ret = await con.acionador.findOneAndUpdate(filter, query, { new: true });

    if (ret.length > 0) {
        console.log("update acionado");
    }
}

async function delet(id) {
    const qtd_digitos = id.length;

    if(qtd_digitos >5){
        ret = await con.agenda.deleteMany({ _id: id })
        console.log("Delete App: " +ret)
    }else{
        var ret = await con.agenda.deleteMany({ id: id })
        console.log("Delete: Excel: " + ret)
        if (ret.length > 0) {
    
        }
    }
}

async function insertBaixa(id_, ano_, mes_, dta_venc, sem_venc, dta_incl, dados_, tempo, status) {
    await con.baixa.create({
        id: id_,
        ano: ano_,
        mes: mes_,
        dta_vencimento: dta_venc,
        sem_vencimento: sem_venc,
        dta_inclusao: dta_incl,
        dados: dados_,
        tempo_dias: tempo,
        status: status
    });
}

async function selectCheckUpdate(){
    const ret = await con.check_update.find();
//console.log(ret)
    if(ret){
        return ret;
    }
    return 0;
}

async function insertCheckUpdate(id_){
    await con.check_update.create({
        id: id_
    });
}

async function updateCheckUpdate(id_){
    const filter = {}
    const query = {id: id_}

    const ret = await con.check_update.findOneAndUpdate(filter, query, { new: true });
    if (ret.length > 0) {
        console.log("check_update");
    }
};

module.exports = { insert, select, update, delet, insertBaixa, updateCheckUpdate, selectCheckUpdate}