const UserRouter = require("./apps/Users/Router")
const ScheduleRouter = require("./apps/Schedule/Router")
const auth = require("./middlewares/auth")
const express = require('express')

const Routers = app =>{

    app.use(
        UserRouter,
        ScheduleRouter,
        express.Router().get('/tokenValid', auth, (req,res) => res.status(200).send(true))
    )
}



module.exports = Routers