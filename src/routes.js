const routes = require( 'express').Router();
const muler = require('multer')
const configMuler = require('./config/multer')


  routes.post('/post', muler(configMuler).single('file'), (req, res) => {
    console.log(req.file)
    return res.json({ok: 'file'})
  })

module.exports = routes;