
exports.up = async function(knex) {
    if (! (await knex.schema.hasTable('schools')) ) {
        await knex.schema.createTable('schools', function (table) {
            table.uuid('id').primary();
            table.string('location');
            table.string('name',100);
            table.string('phone',100);
            table.timestamps()
        });
      }
};

exports.down = async function (knex) {  
    await knex.schema.dropTable('schools');
  }
