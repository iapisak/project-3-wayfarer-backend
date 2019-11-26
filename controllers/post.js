const db = require('../models')

const createPost = (req, res) => {
    const { body, params } = req;
    
    const {currentUser} = req.session;
    if(!currentUser){
        console.log('hey fool')
        return res.status(500).json({message:"you must be logged in"})
    }

    db.City.findOne({ slug: params.city_slug }, (err, foundCity) => {
        if (err) {
            return res.status(404).json({ err, message: 'city not found', });
        }

        const cityId = foundCity._id;
        const newPost = { ...body, city: cityId };
        newPost.user = currentUser
        db.Post.create(newPost, (err, createdPost) => {
            if (err) return res.status(500).json({ err, message:'it broke' });
            res.status(201).json({
                message: 'success!',
                data: createdPost,
            });

            foundCity.posts.push(createdPost._id);
            foundCity.save((err) => {
                if (err) return console.log(err);
            })
            db.User.findById({_id:currentUser}, (err, user) => {
                if (err) return console.log(err)
                if(user){
                user.posts.push(createdPost._id)
                user.save((err,result)=>{
                    if (err) return console.log(err)
                })}
            });
        });
    });
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
};


const deletePost = (req, res) => {
    const { postId } = req.params;
    const { currentUser } = req.session
    if(!currentUser){
        console.log('not logged in')
        return res.status(500).json({message:"you must be logged in"})
    }
    db.Post.findOneAndDelete({_id:postId,user:currentUser}, (err, foundPost) => {
        if (err) return res.status(400).json({ err });
        if(foundPost){
            console.log('here')
        db.User.findById({_id:currentUser},(err,foundUser)=>{
            if (err) return res.status(500).json({err})
            foundUser.posts = foundUser.posts.filter(post=>{
                return `${post}` != postId
            })

            foundUser.save((err,saved)=>{
                db.City.findById({_id:foundPost.city},(err,foundCity)=> {
                    if (err) return res.status(500).json({err})
                    foundCity.posts = foundCity.posts.filter(post=>{
                        return `${post}` != postId
                    })

                    foundCity.save((err,saved)=>{
                        if (err) return console.log(err)
                    })
                
                })
            })

        } )}
        else{
            res.status(500).json({
                message:'bruh moment'
            })
        }

       
       
    });
};

module.exports = {
    createPost,
    allPosts,
    userPosts,
    getPost,
    deletePost,
}