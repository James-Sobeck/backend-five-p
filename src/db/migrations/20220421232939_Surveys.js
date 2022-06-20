/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("survey", (table)=>{
      table.increments("survey_id").primary();
      table.integer("user_id");
      table.foreign("user_id").references("user_id").inTable("users");
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
