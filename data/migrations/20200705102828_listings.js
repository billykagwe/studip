
exports.up = async function(knex) {
    if (! (await knex.schema.hasTable('listings')) ) {
        await knex.schema.createTable('listings', function (table) {
            table.increments('id').primary();
            table.integer('positions')
            table.string('title');
            table.text('description');
            table.text('requirements');
            table.uuid('company_id');
            table.foreign('company_id').references('id').inTable('companies')
            table.timestamps()
        });
      }
};

exports.down = async function (knex) {  
    await knex.schema.dropTable('listings');
  }
