exports.up = function(knex) {
    return knex.schema
    .createTable('tb_email_confirmation', function (table) {
        table.increments('id').primary().notNullable()
        table.string('token', 150).notNullable()
        table.integer('id_user').notNullable().unsigned().references('id').inTable('tb_user').onDelete('CASCADE')
        table.timestamps(false, true); //created_at/updated_at
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_email_confirmation');
};

const tableName = 'tb_email_confirmation';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('token', 150).notNullable();
        table.integer('id_user').notNullable().unsigned().references('id').inTable('tb_user').onDelete('CASCADE');
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

