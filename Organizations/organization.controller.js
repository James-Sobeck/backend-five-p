const { type } = require("express/lib/response");
const service = require("./organization.service");

async function create(req, res){
    console.log(req.body.data);
    const organization = req.body.data;
    let tempOrg = {
        name: organization.name,
        ID: organization.ID,
        address_1: organization.address_1,
        address_2: organization.address_2,
        city: organization.city,
        state: organization.state,
        zip: organization.zip,
        phone_number: organization.phone_number,
        created_at: organization.created_at,
        type: organization.type,
    }
    const {organization_id} = await service.create(tempOrg);
    organization.organization_id = organization_id;
    res.status(201).json({data: tempOrg});
}


module.exports = {
    create
}