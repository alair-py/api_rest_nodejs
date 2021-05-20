const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/Database");
const cors = require("cors");

//Exporta Model
const Jogos = require("./database/Jogos");

//Utiliza o Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Utiliza Cors
app.use(cors());

//Testa conexão com banco
connection.authenticate().then(() => {
    console.log("Conexão OK!");
}).catch((error) => {
    console.log(error);
});



//EndPoint que retorna TODOS itens do banco
app.get("/games", (req, res) => {
    Jogos.findAll({ raw: true }).then((jogos => {
        res.send({ jogos: jogos });
    })).catch((error) => {
        console.log(error);
    })
});


//EndPoint que faz BUSCA especifica no banco pelo ID
app.get("/game/:id", (req, res) => {

    //Verifica se id é um valor válido (número)
    if (!isNaN(req.params.id)) {

        //Caso seja número converto para INT e guardo na var ID
        var id = parseInt(req.params.id);

        //Faz busca no banco com FIND comparando o ID do game no banco com ID guardado na var anteriormente
        Jogos.findOne({
            where: { id: id }
        }).then(jogo => {
            if (jogo != undefined) {
                res.send({ jogos: jogo });
            }
            else {
                res.sendStatus(404);
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    else {
        //Se o id passado para busca não for um número, retorna status 400 (Bad Request)
        res.sendStatus(400);
        res.send("ID inválido, não é um número.")
    }

})


//EndPoint que CADASTRA dados no banco
app.post("/game", (req, res) => {
    var { titulo, ano, preco } = req.body;

    if (titulo == undefined || titulo == '' || isNaN(ano) || isNaN(preco)) {
        res.sendStatus(400);
    }
    else {
        Jogos.create({
            titulo: titulo,
            ano: parseInt(ano),
            preco: parseFloat(preco)
        }).then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
        });
    }
});


//EndPoint que DELETA dados no banco
app.delete("/game/:id", (req, res) => {
    //Verifica se é um número, caso não, retorna 400
    if (isNaN(req.params.id) || req.params.id == undefined) {
        res.sendStatus(400);
    }
    else {
        //Se for um número converte para INT e guarda em variavel
        var id = parseInt(req.params.id);

        Jogos.destroy({
            where: { id: id }
        }).then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
        });
    }
});


//EndPoint que EDITA dados no banco
app.put("/game/:id", (req, res) => {

    //Verifica se id é um valor válido (número)
    if (!isNaN(req.params.id) || req.params.id != undefined) {

        //Caso seja número converto para INT e guardo na var ID
        var id = parseInt(req.params.id);

        var { titulo, ano, preco } = req.body;

        //Faz busca no banco com FIND comparando o ID do game no banco com ID guardado na var anteriormente
        Jogos.update({
            titulo: titulo,
            ano: ano,
            preco: preco
        },
            { where: { id: id } }).then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log(error);
            });

    }
    else {
        //Se o id passado para busca não for um número, retorna status 400 (Bad Request)
        res.sendStatus(400);
        res.send("ID inválido, não é um número.")
    }

});




app.listen(3000, () => {
    console.log("API rodando!");
})