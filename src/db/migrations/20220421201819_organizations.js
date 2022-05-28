/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("orgranizations", (table)=> {
      table.increments("organization_id").primary();
      table.string("name");
      table.integer("ID").unsigned();
      table.string("address_1");
      table.string("address_2");
      table.string("city");
      table.string("state");
      table.string("zip");
      table.string("phone_number");
      table.dateTime("created_at");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
  return knex.schema.dropTable("orgranizations");
};
