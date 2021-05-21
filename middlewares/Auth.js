const jwt = require("jsonwebtoken");

//MIDDLEWARE DE TOKENS
function auth(req, res, next) {
    //Recebe token passando por cabeçalho!
    const authToken = req.headers['authorization'];

    if (authToken != undefined) {

        //Senha secreta do JWT
        const jwtSecret = "9hh2o&Hhd8%¨%@(l3";

        //Separa parte util do token para comparar
        const bearer = authToken.split(" ");
        var token = bearer[1];

        //Verifica tokens!
        jwt.verify(token, jwtSecret, (error, data) => {
            if (error) {
                res.status(401);
                res.json({ error: "token inválido" });
            }
            else {
                req.token = token;
                req.loggedUser = { id: data, email: data.email };

                next();
            }
        });
    }
    else {
        res.status(401);
        res.json({ error: "Token inválido." });
    }

}

module.exports = auth;