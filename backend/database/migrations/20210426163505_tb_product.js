const tableName = 'tb_product';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('title', 50).notNullable();
        table.string('desc', 500).notNullable();
        table.decimal('price', 8, 2).notNullable();
        table.string('unt', 10).notNullable();
        table.string('brand', 50).notNullable();
        table.date('validate', { precision: 6 }).notNullable();
        table.boolean('is_active').defaultTo(true).notNullable();
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.string('url_image', 200).notNullable();
        table.string('key_image', 70).notNullable();
        table.integer('quantity').unsigned().notNullable();
        table.integer('id_category').notNullable().references('id').inTable('tb_category');
        table.integer('id_market').notNullable().references('id').inTable('tb_market');
        table.integer('id_discount').notNullable().references('id').inTable('tb_product_discount');
        table.string('bar_code', 13).notNullable();
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
