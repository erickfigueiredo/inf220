
const tableName = 'tb_salesman';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('business_name', 150).notNullable();
        table.string('cnpj', 14).notNullable().unique();
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.integer('id_user').notNullable().unsigned().references('id').inTable('tb_user').onDelete('CASCADE');
        table.integer('id_bank_account').unsigned().references('id').inTable('tb_bank_account').onDelete('CASCADE');
        table.integer('id_address').unsigned().references('id').inTable('tb_address').onDelete('CASCADE').defaultTo(null);
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
