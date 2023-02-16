/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
    return pgm.createTable('admin', {
        id: 'id',
        name: { type: 'varchar(64)', notNull: true },
        password: { type: 'varchar(64)', notNull: true },

      })
};

exports.down = pgm => {
  return pgm.dropTable('admin')
};
