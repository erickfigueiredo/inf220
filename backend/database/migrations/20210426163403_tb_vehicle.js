
const tableName = 'tb_vehicle';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('alias', 50).notNullable();
        table.string('license_plate', 7);
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.integer('id_deliveryman').unsigned().notNullable().references('id').inTable('tb_user');
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
