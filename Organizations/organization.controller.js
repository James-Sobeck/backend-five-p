const service = require("./organization.service");

async function create(req, res){
    const organization = req.body.data;
    const {organization_id} = await service.create(organization);
    organization.organization_id = organization_id;
    res.status(201).json({data: organization});
}


module.exports = {
    create
}