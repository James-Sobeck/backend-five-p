/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  // return knex.schema.alterTable("orgranizations", (table)=>{
  //     table.string("org_type").notNullable()
  // })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  // return knex.schema.alterTable("orgranizations", (table)=>{
  //     table.dropColumn("org_type");
  // })
};
