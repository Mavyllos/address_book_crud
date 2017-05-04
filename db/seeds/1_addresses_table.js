exports.seed = (knex) => {
   return knex('addresses').del()
     .then(() => {
       return knex('addresses').insert([
         {
           id: 1,
           line_1: '0001 Cemetery Ln.',
           line_2: 'c/o Addams',
           city: 'Cemetery Ridge',
           state: 'Massachusetts',
           zip: 01062
         },
         {
           id: 2,
           line_1: '1313 Mockingbird Ln.',
           line_2: 'c/o Munster',
           city: 'Mockingbird Heights',
           state: 'California',
           zip: 90004
         },
         {
           id: 3,
           line_1: '518 Crestview Dr.',
           line_2: 'c/o Clampett',
           city: 'Beverly Hills',
           state: 'California',
           zip: 90209
         },
         {
           id: 4,
           line_1: '370 Beech St.',
           line_2: 'c/o Bueller',
           city: 'Highland Park',
           state: 'Illinois',
           zip: 60035
         },
         {
           id: 5,
           line_1: '9764 Jeopardy Ln.',
           line_2: 'c/o Bundy',
           city: 'Chicago',
           state: 'Illinois',
           zip: 60610
         },
       ])
     }).then(() => {
       return knex.raw(
         "SELECT setval('addresses_id_seq', (SELECT MAX(id) FROM addresses));"
       )
     })
 }
