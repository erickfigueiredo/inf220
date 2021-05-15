
const tableName = 'tb_user';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('name', 50).notNullable();
        table.string('surname', 50).notNullable();
        table.string('email', 150).notNullable().unique();
        table.string('password', 255).notNullable();
        table.string('phone', 15).notNullable().unique();
        table.string('cpf', 11).notNullable().unique();
        table.date('birthdate').notNullable();
        table.string('type', 1).notNullable();
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.integer('id_wallet').unsigned().references('id').inTable('tb_wallet');
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
