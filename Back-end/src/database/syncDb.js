const dbConnection = require("./dbConnection")
const {User, ResetPassword} = require("../apps/Users/Model")
const Event = require("../apps/Schedule/Model")

// criar tabelas no banco de dados

dbConnection.authenticate()
    .then(() => console.log("DB conectado ..."))
    .catch( error => console.log("Erro ao conectar DB: ", error))

User.sync({force: false}).then(() => {
    ResetPassword.sync({force: false}).then(() => {})
    Event.sync({force: false}).then(() => {})
})

