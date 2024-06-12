const Event = require("./Model")
const {User} = require("../Users/Model")


class EventController{

    async findAll(req,res){
        res.status(200).json(
            await Event.findAll({raw:true})
        )
    }

    async findOne(req,res){
        const id = req.params.id

        if (id){
            const event = await Event.findByPk(id)
            
            if (event){
                res.status(200).json(event)
            }else{
                res.status(404).json({error: "Not found Event !!"})
            }
        }else{
            res.status(400).json({error: "Invalid request !!"})
        }
    }

    async getUserEvents(req,res){
        const id = req.params.id

        if (id){
            
            if (await User.findByPk(id)){
                res.status(200).json( await Event.findAll({where:{userId: id}}))
            }else{
                res.status(404).json({error: "Not found User !!"})
            }
        }else{
            res.status(400).json({error: "Invalid request !!"})
        }
    }

    async create(req,res){
        const data = req.body

        if( await User.findByPk(data.userId )){
            const event = await Event.create(data)
            
            res.status(200).json(event)
        }else{
            res.status(200).json({error: "Invalid userId !!!"})
        }

    }

    async update(req,res){
        const id = req.params.id
        const data = req.body

        console.log("id",req.params)
        console.log(data)

        if (id){
            if (await Event.findByPk(id)){
                
                await Event.update(data, { where: { id } })

                res.status(200).json(await Event.findByPk(id))

            }else{
                res.status(404).json({error: "Not found Event !!"})
            }
        }else{
            res.status(400).json({error: "Invalid request !!"})
        }
    }

    async delete(req,res){
        const id = req.params.id

        if (id){
            const event = await Event.findByPk(id)
            
            if (event){

                Event.destroy({where: {id}})

                res.status(200).json({})
            }else{
                res.status(404).json({error: "Not found Event !!"})
            }
        }else{
            res.status(400).json({error: "Invalid request !!"})
        }
    }

}

module.exports = new EventController()