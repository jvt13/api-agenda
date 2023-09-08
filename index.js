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
    //const rec = con.insert(id_, ano_, mes_, dta_venc, sem_venc, dta_incl, dados_, tempo, status)

    try {
        const data = req.body; // Os dados enviados estão em req.body
        
        // Aqui você pode processar os dados recebidos
        console.log('Dados recebidos:', data);
        console.log(data.nome)

        con.insert(data.id,"","","","",data.data_inclusao,data.dados,data.tempo_venc,"")
        
        // Exemplo de resposta
        res.status(200).json({ mensagem: 'Requisição recebida com sucesso!', status:'Y' });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao processar os dados recebidos.', status:'N' });
    }

    /*if (rec) {
        res.send("Tabela criada");
    } else {
        res.send("Tabela não criada");
    }*/
});

app.get('/api/consulta-list', async (req, res) => {

    const list = await con.select();
    res.json({ list: list });
});

app.listen(porta, () => {
    console.log('server rodando na porta ' + porta);
});