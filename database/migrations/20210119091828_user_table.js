
const tableName = 'tb_user';

exports.up = async function (knex) {
    await knex.schema.raw('CREATE IF NOT EXISTS EXTENSION UNACCENT').createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('name', 50).notNullable();
        table.string('surname', 50).notNullable();
        table.string('email', 150).notNullable().unique();
        table.string('password', 255).notNullable();
        table.string('tel', 15).notNullable().unique();
        table.date('birthdate').notNullable();
        table.string('type', 1).notNullable();
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.boolean('is_verified').defaultTo(false);
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
