const routes = require( 'express').Router();
const muler = require('multer')
const configMuler = require('./config/multer')
const Post = require('./models/Post')



  routes.delete('/post/:id', async (req, res) => {
    const del = await Post.findById(req.params.id)



    if(!del) {
      return res.json({id: `id nao encontrado ${req.params.id}`})
    }
    
   await del.remove();
   return res.send();
  })

  routes.get('/post', async (req, res) => {
    const post = await Post.find();

    return res.json(post)
  })

  routes.post('/post', muler(configMuler).single('file'), async (req, res) => {
    
    const {originalname: name, size, key, location: url = ''} = req.file;

    const post = await Post.create({
      name, 
      size,
      key,
      url
    })
    
    return res.json(post)
  })

module.exports = routes;