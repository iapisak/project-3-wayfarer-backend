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
  
    db.User.findById({_id:req.params.id}, (err,foundUser)=>{
        if (err) return res.status(500)
        if(foundUser){
           const posts = foundUser.populate("posts")
            res.send({status:200,posts})
            
            
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