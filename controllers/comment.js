const db = require('../models')

const createComment = (req,res) => {
  const {postId} = req.params
  db.Post.findById({_id:postId},(err,foundPost)=>{
    if (err) return res.status(500).json({err})
    foundPost.comments.push(req.body)

    foundPost.save((err,saved)=>{
      if (err) console.log(err)
      saved.populate('comments.user').execPopulate((err,result)=>{
        if (err) return res.status(500).json({err})
        return res.status(201).json({post:result})
      })

    }
      )
  })
  

 
 
}


module.exports = {
  createComment,
}