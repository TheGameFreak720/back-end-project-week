
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'FlatBush Zombies', description: 'I love their rap',},
        {id: 2, title: 'Build a house', description: 'You play minecraft idk'},
        {id: 3, title: `I'm Billy`, description: 'Hyuck Billy is my name'}
      ]);
    });
};
