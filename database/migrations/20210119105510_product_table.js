
const tableName = 'tb_product';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('title', 50).notNullable();
        table.integer('num_access').defaultTo(0).notNullable();
        table.text('description').notNullable();
        table.decimal('price').notNullable();
        table.integer('quantity').notNullable();
        table.string('quality', 1).notNullable();
        table.decimal('depth').notNullable();
        table.decimal('width').notNullable();
        table.decimal('height').notNullable();
        table.string('style', 30).notNullable();
        table.integer('avaliation').defaultTo(null);
        table.boolean('is_active').defaultTo(true).notNullable();
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.string('url_image', 200).notNullable();
        table.string('key_image', 70).notNullable();
        table.integer('id_material').notNullable().unsigned().references('id').inTable('tb_material').onDelete('CASCADE');
        table.integer('id_salesman').notNullable().unsigned().references('id').inTable('tb_salesman').onDelete('CASCADE');
        table.integer('id_discount').unsigned().references('id').inTable('tb_product_discount').onDelete('CASCADE');
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
