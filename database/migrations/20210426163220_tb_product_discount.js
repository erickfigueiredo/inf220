
const tableName = 'tb_product_discount';

exports.up = async function (knex) {
    await knex.schema.raw('CREATE IF NOT EXISTS EXTENSION UNACCENT').createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('value', 2).notNullable();
        table.boolean('is_deleted').notNullable.defaultTo(false);
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
