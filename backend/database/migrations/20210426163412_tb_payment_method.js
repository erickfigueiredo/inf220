
const tableName = 'tb_payment_method';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('name', 50).notNullable();
        table.string('type', 1).notNullable();
        table.string('number', 16).notNullable();
        table.date('valid_date').notNullable();
        table.integer('id_user').notNullable().unsigned().references('id').inTable('tb_user').onDelete('CASCADE');
        table.boolean('is_deleted').defaultTo(false).notNullable();
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
