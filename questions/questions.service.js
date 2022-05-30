const knex = require("../src/db/connection");

function questionSave(question){
    return knex("mod_question")
    .insert(question)
    .returning("*")
    .then((savedQuestion)=> savedQuestion[0])
}