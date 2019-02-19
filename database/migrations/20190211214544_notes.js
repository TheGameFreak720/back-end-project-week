
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
    table.increments();
    table.string('title').notNullable();
    table.string('description', 500);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
