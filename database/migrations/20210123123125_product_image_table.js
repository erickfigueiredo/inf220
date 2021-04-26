
const tableName = 'tb_product_image';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('name', 200).notNullable();
        table.string('size', 30).notNullable();
        table.string('key', 200).notNullable();
        table.string('url', 200);
        table.integer('id_product').notNullable().unsigned().references('id').inTable('tb_product').onDelete('CASCADE');
        table.timestamps(false, true)
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

