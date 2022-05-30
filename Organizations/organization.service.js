const knex = require("../src/db/connection")

function create(organization){
    return knex("orgranizations")
    .insert(organization)
    .returning("*")
    .then((newOrg)=> newOrg[0])
}

module.exports = {
    create
}