
const tableName = 'tb_bank_account';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('account', 10).notNullable();
        table.string('agency', 10).notNullable();
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.integer('id_bank').notNullable().unsigned().references('id').inTable('tb_bank');
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
