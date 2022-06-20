const knex = require("../src/db/connection");

function surveySave(survey){
    return knex("survey")
    .insert(survey)
    .returning("*")
    .then((saved)=> saved[0])
}

module.export = {
    surveySave
}