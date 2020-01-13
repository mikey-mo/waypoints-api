exports.up = function(knex, Promise) {
  return knex.schema
    .raw('create extension if not exists "uuid-ossp"')
    .createTable("users", table => {
      table
        .uuid("id")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("first_name");
      table.string("last_name");
      table.string("email");
      table.string("password");
      table.boolean("active").defaultTo(true);
      table.boolean("verified").defaultTo(false);
      table.string("verification_code");
      table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
