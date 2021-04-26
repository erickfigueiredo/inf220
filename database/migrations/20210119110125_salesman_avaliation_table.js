
const tableName = 'tb_salesman_avaliation';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.string('liked', 2).notNullable();
        table.text('comment');
        table.boolean('is_deleted').defaultTo(false).notNullable();
        table.integer('id_order').notNullable().unsigned().references('id').inTable('tb_order').onDelete('CASCADE').notNullable();
        table.integer('id_client').notNullable().unsigned().references('id').inTable('tb_client').onDelete('CASCADE');
        table.integer('id_salesman').notNullable().unsigned().references('id').inTable('tb_salesman').onDelete('CASCADE');
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
