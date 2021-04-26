
const tableName = 'tb_address';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('alias', 50).notNullable();
        table.string('street', 100).notNullable();
        table.string('neigh', 100).notNullable();
        table.string('complement', 100);
        table.string('num', 10).notNullable();
        table.string('zipcode', 8).notNullable();
        table.string('city', 60).notNullable();
        table.string('state', 60).notNullable();
        table.string('country', 60).notNullable();
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.integer('id_user').notNullable().unsigned().references('id').inTable('tb_user').onDelete('CASCADE').notNullable();
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
