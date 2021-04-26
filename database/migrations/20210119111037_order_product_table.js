
const tableName = 'tb_order_product';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.decimal('price').notNullable();
        table.decimal('discount').notNullable();
        table.integer('quantity').notNullable();
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.integer('id_product').notNullable().unsigned().references('id').inTable('tb_product').onDelete('CASCADE');
        table.integer('id_order').notNullable().unsigned().references('id').inTable('tb_order').onDelete('CASCADE');
        table.integer('id_avaliation').unsigned().references('id').inTable('tb_product_order_avaliation').onDelete('CASCADE');
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

