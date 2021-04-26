const tableName = 'tb_order';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.boolean('is_delivered').defaultTo(false).notNullable();
        table.decimal('order_total', 8, 2).notNullable();
        table.decimal('tip', 8, 2);
        table.decimal('shipping', 8, 2);
        table.string('status', 1).notNullable();
        table.timestamps(false, true);
        table.integer('id_deliveryman').unsigned().notNullable().references('id').inTable('tb_user');
        table.integer('id_user').unsigned().notNullable().references('id').inTable('tb_user');
        table.integer('id_market').unsigned().notNullable().references('id').inTable('tb_market');
        table.integer('id_payment_method').unsigned().notNullable().references('id').inTable('tb_payment_method');
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
