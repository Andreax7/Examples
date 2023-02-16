
exports.shorthands = undefined

exports.up = pgm => {
    return pgm.createTable('cinema', {
        id: 'id',
        name: { type: 'varchar(200)', notNull: true },
        location: { type: 'varchar(200)', notNull: true },
        openDays: { type: 'varchar(200)', notNull: true },
        openHours: { type: 'varchar(50)', notNull: true },
       

      })
};

exports.down = pgm => {
  return pgm.dropTable('cinema')
};
