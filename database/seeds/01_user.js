
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tb_bank').del()
    .then(function () {
      // Inserts seed entries
      return knex('tb_bank').insert([
        { code: '001', ispb: '0', name: 'Banco do Brasil S.A (BB)'},
      ]);
    });
};
