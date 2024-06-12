const express = require("express")
const EventController = require("./Controller")

const auth = require("../../middlewares/auth")
const createEventRules = require("../../middlewares/validationRules/Event/create")
const updateEventRules = require("../../middlewares/validationRules/Event/update")


const ScheduleRouter = express.Router()

ScheduleRouter.get("/events",auth, EventController.findAll),
ScheduleRouter.get("/events/user/:id",auth, EventController.getUserEvents)
ScheduleRouter.get("/events/:id",auth, EventController.findOne)
ScheduleRouter.delete("/events/:id",auth, EventController.delete)
ScheduleRouter.put("/events/:id",auth,updateEventRules, EventController.update)
ScheduleRouter.post("/events",auth, createEventRules, EventController.create)


module.exports = ScheduleRouter