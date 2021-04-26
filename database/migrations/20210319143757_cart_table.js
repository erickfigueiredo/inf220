
const tableName = 'tb_cart';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary().notNullable();
        table.integer('id_user').notNullable().unsigned().references('id').inTable('tb_user').onDelete('CASCADE');
        table.integer('id_product').notNullable().unsigned().references('id').inTable('tb_product').onDelete('CASCADE');
        table.integer('quantity').notNullable().unsigned();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName);
};
