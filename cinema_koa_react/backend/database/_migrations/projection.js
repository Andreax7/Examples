
exports.shorthands = undefined

exports.up = pgm => {
    return pgm.createTable('projection', {
        id: 'id',
        cinemaid: { type: 'integer', references: '"cinema"', onDelete: 'cascade', notNull: true },
        category: { type: 'integer', references: '"category"', onDelete: 'cascade', notNull: true },
        title: { type: 'varchar(250)', notNull: true },
        duration: { type: 'varchar(16)', notNull: true },
        day: { type: 'date', notNull: true }, // format type: 'yyyy-mm-dd'
        time: { type: 'time', notNull: true }, // format type: 'hh:mi:ss'
        createdAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
        },
      })
};

exports.down = pgm => {
  return pgm.dropTable('projection')
};
