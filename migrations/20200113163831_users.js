exports.up = function userUp(knex) {
  return knex.schema
    .raw('create extension if not exists "uuid-ossp"')
    .createTable('users', (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
      table.boolean('active').defaultTo(true);
      table.timestamps(true, true);
    });
};

exports.down = function userDown(knex) {
  return knex.schema.dropTable('users');
};
