
exports.up = async function(knex) {
    if (! (await knex.schema.hasTable('users')) ) {
        await knex.schema.createTable('users', function (table) {
            table.uuid('id').primary();
            table.string('email');
            table.string('role')
            table.unique('email');
            table.string('password',100);
            table.timestamps();
        }
         ) }}




exports.down = async function (knex) {  
    await knex.schema.dropTable('users');
  }
