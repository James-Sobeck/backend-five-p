/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("mod_question", (table)=>{
        table.increments("mod_question_id").primary();
        table.text("question_answer_pre");
        table.text("question_answer_post");
        table.integer("module_id");
        table.foreign("module_id").references("module_id").inTable("modules");
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
  