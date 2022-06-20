const knex = require("../src/db/connection");

function create(module){
    return knex("modules")
    .insert()
    .returning("*")
    .then((newMod)=> newMod[0])
}

module.exports = {
    create
}