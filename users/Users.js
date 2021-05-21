const Sequelize = require("sequelize");
const connection = require("../database/Database");

const Users = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

/*Users.sync({ force: true })
    .then(() => {
        console.log("Tabela users criada!");
    });
*/

module.exports = Users;