const tableName = 'tb_order_product';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.decimal('price', 8, 2).notNullable();
        table.decimal('discount', 8, 2).notNullable();
        table.integer('quantity').notNullable()
        table.string('description', 255).notNullable();
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.integer('id_product').notNullable().unsigned().references('id').inTable('tb_product').onDelete('CASCADE');
        table.integer('id_order').notNullable().unsigned().references('id').inTable('tb_order').onDelete('CASCADE');
        table.timestamps(false, true);
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

