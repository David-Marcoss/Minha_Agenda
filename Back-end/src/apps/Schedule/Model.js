const dbConnection = require("../../database/dbConnection")
const Sequelize = require("sequelize");

const {User} = require("../Users/Model")

const Event = dbConnection.define("events", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    start: {
        type: Date,
        allowNull: false
    },
    end: {
        type: Date,
        allowNull: false
    },
    allDay: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

})

Event.belongsTo(User)
User.hasMany(Event)


module.exports = Event