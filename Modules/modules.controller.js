const service = require("./modules.service");

async function create(req, res) {
    const module = req.body.data
    const newModule = {
        user_id: module.user_id,
        finished_at: module.finished_at
    }
    const {module_id} = await service.create(newModule);
    newModule.module_id = module_id;
    res.status(201).json({data: newModule})
}

async function list(req, res){
    
}

module.exports = {
    create
}