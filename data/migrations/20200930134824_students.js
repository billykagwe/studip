exports.up = async function(knex) {
    if (! (await knex.schema.hasTable('students')) ) {
        await knex.schema.createTable('students', function (table) {
            table.uuid('id').primary();
            table.string('name');
            table.string('phone');
            table.string('email');
            table.string('course');
            table.json('referee1')
            table.json('referee2')
            table.text('trainings');
            table.text('skills');
            table.text('personal_statement');
            table.string('adm',100);
            table.text('hobbies'),
            table.text('voluntary_work'),
            table.json('education1'),
            table.json('education2'),
            table.date('start_date')
            table.date('end_date')
            table.boolean('attached').defaultTo(false)
            table.uuid('school_id')
            table.foreign('school_id').references('id').inTable('schools')
            table.integer('listing_id')
            table.foreign('listing_id').references('id').inTable('listings')
            table.timestamps()
        });
      }
};

exports.down = async function (knex) {  
    await knex.schema.dropTable('students');
  }