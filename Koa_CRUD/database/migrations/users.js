/* eslint-disable camelcase */

exports.up = pgm => {
    return pgm.createTable('users', {
        id: 'id',
        username: { type: 'varchar(64)', notNull: true },
        password: { type: 'varchar(64)', notNull: true },
        role: { type: 'varchar(64)', notNull: true },
        createdAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
      })
};

exports.down = pgm => {
    return pgm.dropTable('users')
};
