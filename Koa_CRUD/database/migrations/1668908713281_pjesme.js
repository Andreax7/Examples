/* eslint-disable camelcase */

exports.up = pgm => {
    return pgm.createTable('songs', {
        id: 'id',
        title: { type: 'varchar(1000)', notNull: true },
        len: { type: 'varchar(1000)', notNull: true },
        autorid: { type: 'integer', references: '"autori"', onDelete: 'cascade', notNull: true },
        genres: { type: 'integer', references: '"genre"', onDelete: 'cascade', notNull: true },
        createdAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
      })
};

exports.down = pgm => {
  return pgm.dropTable('songs')
};
