const db = require('../models')

const createComment = (req,res) => {
  const {postId} = req.params
  console.log(postId)
  db.Comment.create(req.body, (err,NewComment)=>{
    if (err) return res.status(500).json({err})
    db.Post.findById({_id:postId},(err,foundPost)=>{
      if (err) return res.status(500).json({err})
      foundPost.comments.push(NewComment)
      console.log({NewComment})
      foundPost.save((err,saved)=>{
        if (err) console.log(err)
        res.status(201).json({post:saved})
      }
        )
    })
  })
 
}


module.exports = {
  createComment,
}