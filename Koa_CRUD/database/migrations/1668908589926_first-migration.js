/* eslint-disable camelcase */

exports.up = pgm => {
    return pgm.createTable('autori', {
        id: 'id',
        name: { type: 'varchar(1000)', notNull: true },
        createdAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
      })
};

exports.down = pgm => {
    return pgm.dropTable('autori')
};
