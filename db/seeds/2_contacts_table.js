exports.seed = (knex) => {
   return knex('contacts').del()
     .then(() => {
       return knex('contacts').insert([
         {
           id: 1,
           first_name: 'Wednesday',
           last_name: 'Addams',
           phone_number: '5559233267',
           email_address: 'creepygrrl@macabre.com',
           image_url: 'https://s-media-cache-ak0.pinimg.com/564x/68/8b/b2/688bb22f1c82f8633b7c279fae38ae34.jpg',
           address_id: 1
         },
         {
           id: 2,
           first_name: 'Lily',
           last_name: 'Munster',
           phone_number: '5556867837',
           email_address: 'dracsdaughter@darkandtwisted.com',
           image_url: 'https://www.munsters.com/images/lily.jpg',
           address_id: 2
         },
         {
           id: 3,
           first_name: 'Elly Mae',
           last_name: 'Clampett',
           phone_number: '5552526738',
           email_address: 'ladyrassler@mountaingold.com',
           image_url: 'https://envisioningtheamericandream.files.wordpress.com/2015/01/elly-mae-clampett.jpg',
           address_id: 3
         },
         {
           id: 4,
           first_name: 'Ferris',
           last_name: 'Bueller',
           phone_number: '5552835537',
           email_address: 'ferrarijoyride@mydayoff.com',
           image_url: 'http://www.chicagonow.com/reflections-chicago-life/files/2016/06/review_alterego.jpg',
           address_id: 4
         },
         {
           id: 5,
           first_name: 'Peggy',
           last_name: 'Bundy',
           phone_number: '5552528639',
           email_address: 'redhotmomma@bighairdontcare.com',
           image_url: 'http://thehollywoodmag.com/wp-content/uploads/2015/07/Peggy-Bundy.jpg',
           address_id: 5
         },
       ])
     }).then(() => {
       return knex.raw(
         "SELECT setval('contacts_id_seq', (SELECT MAX(id) FROM contacts));"
       )
     })
 }
