const mongoose = require('mongoose')
const aws = require('aws-sdk')
const fs = require('fs')
const { promisify } = require('util')
const path = require('path')

const s3 = new aws.S3()

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

 PostSchema.pre('save', function(next) {
  if(process.env.STORAGE_TYPE !== 's3') {
    this.url = `${process.env.APP_URL}/files/${this.key}`
  }
  next()
}) 

// deleta da aws

PostSchema.pre('remove', async function(next) {
  if(process.env.STORAGE_TYPE === 's3') {
   
    const params = {
      Bucket: process.env.BUCKET, 
      Key: this.key
     };

     return s3.deleteObject(params, function(err, data) {
       if (err) console.log(err, err.stack); 
       else     console.log("successful response delete"); 
       next();
     });
    
  } else {

 
      promisify(fs.unlink)(
        path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key),
      )
  
    return next()

  }

})


module.exports = mongoose.model('Post', PostSchema)