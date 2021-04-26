
const tableName = 'tb_order';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.boolean('is_delivered').defaultTo(false).notNullable();
        table.decimal('order_total').notNullable();
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.string('method', 1).notNullable();
        table.string('portions', 2).defaultTo(null);
        table.integer('id_client').notNullable().unsigned().references('id').inTable('tb_client').onDelete('CASCADE');
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
