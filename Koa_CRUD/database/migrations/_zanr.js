exports.up = pgm => {
    return pgm.createTable('genre', {
        id: 'id',
        genre_name: { type: 'varchar(1000)', notNull: true },
        createdAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
      })
};

exports.down = pgm => {
  return pgm.dropTable('genre')
};
