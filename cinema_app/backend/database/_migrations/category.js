/* eslint-disable camelcase */
exports.shorthands = undefined

exports.up = pgm => {
    return pgm.createTable('category', {
        id: 'id',
        category: { type: 'varchar(150)', notNull: true },
    

      })
};

exports.down = pgm => {
  return pgm.dropTable('category')
};
