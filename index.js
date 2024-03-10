const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const con = require('./services/mongobd/util_banco');
const cone = require('./services/mongobd/conexao');
const { debug } = require('console');

//const app = express();
const app = express.Router();
const porta = process.env.PORT || 5000;

app.use(bodyParser.json());  // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
//app.set('views', path.join(__dirname, '/pages'));

const diretorioAtual = __dirname;
const pastaRaiz = path.resolve(diretorioAtual);

app.get('/', (req,res)=>{
    
    //res.send('teste rota api: File = '+ pastaRaiz);
    res.sendFile(pastaRaiz + '/pages/home.html')
})

app.get('/api', async (req, res) => {
    console.log('teste rota api');
    res.render('home');

});

app.post('/api/insert', async (req, res) => {
    try {
        var list_id = await con.selectCheckUpdate();
        list_id = await list_id.map(function (val) {
            return {
                id: val.id
            }
        });
        console.log("ID: " + list_id[0].id)
        const data = req.body; // Os dados enviados estão em req.body

        // Aqui você pode processar os dados recebidos
        //console.log('Dados recebidos:', data);
        //console.log(data.dta_inclusao)

        con.insert(list_id[0].id, data.ano, data.mes, data.dta_vencimento, data.sem_vencimento, data.dta_inclusao, data.dados, data.tempo_venc, "")

        console.log("ID2: ", data.id)
        con.updateCheckUpdate(data.id); 

        // Exemplo de resposta
        res.status(200).json({ mensagem: 'Requisição recebida com sucesso!', status: 'Y' });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao processar os dados recebidos.', status: 'N' });
    }
})

app.post('/api/delete', async (req, res) => {
    try {
        const data = req.body;
        console.log(data.id);

        //con.delet(data.id);
        const list = await con.select();

        //console.log("ID update: "+ data.id_check);
        con.updateCheckUpdate(data.id_check);

        res.status(200).json({ mensagem: 'Requisição recebida com sucesso!', status: "Y", list: list });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao processar os dados recebidos.', status: 'N' });
    }
});

app.post('/api/baixa', async (req, res) => {
    try {
        const data = req.body; // Os dados enviados estão em req.body
        console.log('Dados recebidos:', data);

        con.insertBaixa(data.id, "", "", "", "", data.data_inclusao, data.dados, data.tempo_venc, "")

        res.status(200).json({ mensagem: 'Requisição recebida com sucesso!', status: "Y", list: list });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao processar os dados recebidos.', status: 'N' });
    }
});

app.get('/api/consulta-list', async (req, res) => {

    const list = await con.select();
    //console.log("Requisição:" + list)
    res.json({ list: list });
});

app.get('/api/check-update', async (req, res) => {
});

/*app.listen(porta, () => {
    console.log('server rodando na porta ' + porta);
});*/

module.exports = app;