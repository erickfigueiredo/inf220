
const tableName = 'tb_wallet';
exports.up = async function(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.decimal('total', 8, 2).notNullable();
        table.string('pix_key', 100).unique().notNullable();
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

exports.down = function(knex) {
    return knex.schema.dropTable(tableName);
};
