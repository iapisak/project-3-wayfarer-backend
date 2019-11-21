const db= require('../models')

const createPost = (req,res) => {
    const { body } = req
    const newPost = {...body}
    db.Post.create(newPost, (err,createdPost)=> {
        if(err) return res.status(500).json({err,message:'it broke'})
        res.status(201).json({
            message:"success!",
            data:createdPost
        })
    })
    

}



const userPosts = (req,res) => {
   const {_id} = req.body
    db.User.findById(_id, (err,foundUser)=>{
        if (err) return res.status(500)
        if(foundUser){
            foundUser.populate(posts)
            res.send({status:200,data:foundUser.posts})
        }
        else res.status(500).json({message:'user not found'})
    })
}

const allPosts = (req,res) => {
   db.Post.find({},(err,posts)=>{
       if (err) res.status(500).json({err})

       res.send({posts})
   })
}

module.exports = {
    createPost,
    allPosts,
    userPosts
}