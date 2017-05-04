var express = require('express');
var router = express.Router();
var db = require('../db/connection.js')

router.get('/', function(req, res, next) {
  db.from('contacts')
  .innerJoin( 'addresses', 'addresses.id', 'contacts.address_id')
  .then(contacts => {
     res.render('contacts/index',
     { contacts })
  })
  .catch(err => {
    next(err)
  })
});

router.get('/new', (req, res, next) => {
  res.render('contacts/new');
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id
  db.from('contacts')
  .innerJoin( 'addresses', 'addresses.id', 'contacts.address_id')
  .where('contacts.id', id)
  .first()
  .then(contact => {
    res.render('contacts/show', { contact });
  })
  .catch(err => {
    next(err);
  })
});

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id
  db.from('contacts')
  .innerJoin( 'addresses', 'addresses.id', 'contacts.address_id')
  .where('contacts.id', id)
  .first()
  .then(contact => {
  res.render('contacts/edit', { contact })
  })
  .catch(err => {
    next(err)
  })
});

router.post('/', (req, res, next) => {
  var address = {
    line_1: req.body.line_1,
    line_2: req.body.line_2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  }
  db('addresses')
  .insert(address, '*')
  .then(newAddressId => {
    let contact = {
      address_id: newAddressId[0].id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email_address: req.body.email_address,
      image_url: req.body.image_url
    }
    return db('contacts')
    .insert(contact, '*')
    .returning('id')
  }).then(id => {
    res.redirect(`/contacts/${id}`)
  })
});

router.put('/:id', (req, res, next) => {
  var id = req.params.id
  var address = {
    line_1: req.body.line_1,
    line_2: req.body.line_2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  }
  var contact = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    email_address: req.body.email_address,
    image_url: req.body.image_url
  }
  var contact_id =req.params.id;
  db('contacts')
    .update(contact)
    .where('id', contact_id)
    .returning('address_id')
  .then(id => {
    db('addresses')
    .update(address)
    .where('id', id[0])
    .then(() => {
      res.redirect(`/contacts/${contact_id}/`)
    })
  })
});

router.delete('/:id', (req, res, next) => {
  var id = req.params.id
  db('contacts')
  .where({ id })
  .select('*')
  .first()
  .then((result) => {
    db('contacts')
    .del()
    .where({ id })
    .then(() => {
      var address_id = result.address_id
      db('addresses')
      .del()
      .where({ id })
      .then(() => {
        res.redirect('/contacts')
      })
    })
  })
});

module.exports = router;
