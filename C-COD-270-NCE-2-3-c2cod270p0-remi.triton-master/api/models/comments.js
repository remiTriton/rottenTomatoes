const { Schema, model } = require('mongoose')

const CommentSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  movieId:{
    type:String,
    required:true
  }
},
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  })

module.exports = model('Comment', CommentSchema)