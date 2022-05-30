const knex = require("../src/db/connection")

function create(organization){
    return knex("organization")
    .insert(organization)
    .returning("*")
    .then((newOrg)=> newOrg[0])
}

module.exports = {
    create
}