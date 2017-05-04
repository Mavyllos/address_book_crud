exports.up = (knex) => {
return knex.schema.createTable('contacts', table => {
  table.increments()
  table.integer('address_id').notNullable().references('id').inTable('addresses');
  table.string('first_name').notNullable()
  table.string('last_name').notNullable()
  table.string('phone_number').notNullable()
  table.string('email_address').notNullable()
  table.text('image_url')
  table.timestamps(true, true)
  })
}

exports.down = (knex) => {
 return knex.schema.dropTable('contacts')
}
