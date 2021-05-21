const express = require("express");
const router = express.Router();
const User = require("./Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/Auth");


//Senha secreta do JWT
const jwtSecret = "9hh2o&Hhd8%¨%@(l3";


//-------------------------------------------------------------------------
//ROTA DE VIEW DE NOVOS USUARIOS
router.get("/user", auth, (req, res) => {
    res.status(200);
    res.send("Página de novos usuários");
});

//ROTA DE CRIACAO DE NOVO USUARIO
router.post("/user", auth, (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if (email != undefined && password != undefined) {

        User.findOne({ where: { email: email } })
            .then(user => {
                if (user == undefined) {
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(password, salt);

                    User.create({
                        email: email,
                        password: hash
                    })
                        .then(() => {
                            res.status(200);
                            res.send("Usuário Criado");
                        })
                        .catch(error => {
                            res.redirect("Erro ao criar usuário");
                        })
                }
                else {
                    res.redirect("/user/new");
                }
            })


    }
});


//ROTA DE VIEW DE LOGIN
router.get("/login", (req, res) => {
    res.send("Página de Login");
    res.status(200);
});


//ROTA DE AUTENTICACAO DE USUARIO
router.post("/login", auth, (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ where: { email: email } })
        .then(user => {
            if (user != undefined) {

                var correct = bcrypt.compareSync(password, user.password);

                if (correct) {
                    //Gerando TOKEN (payload)
                    jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: "24h" }, (error, token) => {
                        if (error) {
                            res.status(400);
                        }
                        else {
                            res.status(200);
                            res.json({ token: token });

                        }
                    });

                }
                else {
                    res.status(401);
                    res.send("Usuário ou senha inválidos");

                }
            }
            else {
                res.status(404);
                res.send("Usuário não encontrado");

            }
        })
});

//---------------------------------------------------------------------------








module.exports = router;