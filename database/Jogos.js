const Sequelize = require("sequelize");
const connection = require("./Database");

const Jogos = connection.define('jogos', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

/*Jogos.sync({ force: true })
    .then(() => {
        console.log("Tabela Criada!");
    });
*/

module.exports = Jogos;