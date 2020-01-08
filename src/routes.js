const routes = require( 'express').Router();
const muler = require('multer')
const configMuler = require('./config/multer')
const Post = require('./models/Post')


  routes.post('/post', muler(configMuler).single('file'), async (req, res) => {
    
    const {originalname: name, size, filename: key} = req.file;

    const post = await Post.create({
      name, 
      size,
      key,
      url: 'www.google.com'
    })
    
    return res.json(post)
  })

module.exports = routes;