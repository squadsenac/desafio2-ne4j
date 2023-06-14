const express = require('express');
const usuarios = require('../routes/usuarios');
const amigos = require('../routes/amigos');
const error = require('../middleware/error');
module.exports = function(app) {
  app.use(express.json());
  app.use('/api/users', usuarios);
  app.use('/api/friends', amigos);
  app.use(error);
};