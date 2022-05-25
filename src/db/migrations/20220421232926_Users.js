/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id").primary();
    table.string("email").unique();
    table.string("first_name");
    table.string("last_name");
    table.string("address_1");
    table.string("address_2");
    table.string("city");
    table.string("state");
    table.string("zip");
    table.integer("phone_number");
    table.string("mobile_number");
    table.integer("organization_id").unsigned();
    table.foreign("organization_id").references("organization_id").inTable("orgranizations");
    table.string("hash");
    table.string("salt");
    table.integer("module_id_complete");
    table.integer("module_id_todo");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
