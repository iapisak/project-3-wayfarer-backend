const db= require('../models')

const createPost = (req,res) => {
    const { body } = req
    const { currentUser } = req.session
    
    const newPost = {...body,user:currentUser}
    console.log(newPost)
    db.Post.create(newPost, (err,createdPost)=> {
        if(err) return res.status(500).json({err,message:'it broke'})
        res.status(201).json({
            message:"success!",
            data:createdPost
        })
        db.User.findById(currentUser,(err,user)=>{
            if (err) return console.log(err)
            if(user){
            user.posts.push(createdPost._id)
            user.save((err,result)=>{
                if (err) return console.log(err)
                console.log(result)
            })}
        })
    })
    

}


const getPost = (req,res) => {
    const _id = req.params.postId

    db.Post.findById(_id,(err,post)=> {
        if (err) return res.status(500).json({err})
        res.send({
            status:201,
            post,
        })
    })
}
const userPosts = (req,res) => {
  
    db.User.findById({_id:req.params.id}, (err,foundUser)=>{
        if (err) return res.status(500)
        if(foundUser){
          foundUser.populate("posts").execPopulate((err,user)=> {
              if (err) return res.status(500).json({err})
            res.send({status:200,posts:user.posts})
        })
        
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
    userPosts,
    getPost
}