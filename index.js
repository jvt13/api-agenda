const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const con = require('./services/mongobd/util_banco');
const cone = require('./services/mongobd/conexao');
const { debug } = require('console');

const app = express();
const porta = process.env.PORT || 5000;

app.use(bodyParser.json());  // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));

app.get('/api', (req, res) => {

    res.render('home');

});

app.post('/api/insert', (req, res) => {
    try {
        const data = req.body; // Os dados enviados estão em req.body

        // Aqui você pode processar os dados recebidos
        console.log('Dados recebidos:', data);
        console.log(data.dta_inclusao)

        con.insert(data.id, data.ano, data.mes, data.dta_vencimento, data.dia_semana, data.dta_inclusao, data.dados, data.tempo_venc, "")

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

        con.delet(data.id);
        const list = await con.select();

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

app.listen(porta, () => {
    console.log('server rodando na porta ' + porta);
});