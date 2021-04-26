
const tableName = 'tb_market';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('business_name',150).notNullable();
        table.string('cnpj', 14).notNullable().unique();
        table.string('email', 150).notNullable().unique();
        table.string('phone', 15).notNullable().unique();
        table.string('password', 255).notNullable();
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.integer('id_address').notNullable().unsigned().references('id').inTable('tb_address').onDelete('CASCADE');
        table.timestamps(false, true); //created_at/updated_at
    });

    await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON ${tableName}
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName);
};
