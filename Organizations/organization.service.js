const knex = require("../src/db/connection")

function create(organization){
    return knex("organizations")
    .insert(organization)
    .returning("*")
    .then((newOrg)=> newOrg[0])
}

module.exports = {
    create
}