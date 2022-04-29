/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("modules", (table)=>{
      table.increments("module_id").primary();
      table.text("question_answer_pre");
      table.text("question_answer_post");
      table.integer("user_id");
      table.dateTime("finished_at");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("modules");
};
