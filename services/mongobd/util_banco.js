const con = require('./conexao');

async function insert(id_, ano_, mes_, dta_venc, sem_venc, dta_incl, dados_, tempo, status) {
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

module.exports = { insert, select, update }