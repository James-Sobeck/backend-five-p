/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("modules", (table)=>{
      table.increments("module_id").primary();
      table.integer("user_id");
      table.foreign("user_id").references("user_id").inTable("users")
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
