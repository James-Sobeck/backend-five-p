/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("survey", (table)=>{
      table.increments("survey_id").primary();
      table.text("survey_desc");
      table.string("survey_name");
      table.text("survey_text");
      table.text("survey_answer");
      
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("survey");
};
