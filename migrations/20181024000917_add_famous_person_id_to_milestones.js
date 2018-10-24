
exports.up = function(knex, Promise) {
   return knex.schema.table('milestones', function (table) {
   
    table.integer('famous_person_id');
  
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones')
};
