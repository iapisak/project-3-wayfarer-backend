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
            createdPost.populate('user').execPopulate((err, post) => {
                res.status(201).json({
                    message: 'success!',
                    data: post,
                });
            })

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
    db.Post.findOne({ _id: req.params.postId },(err, foundPost)=> {
        if (err) return res.status(500).json({err})
        if (foundPost) {
            foundPost.populate('user').execPopulate((err, post) => {
                if(err) return console.log(err)
                console.log({post})
                post.populate('comments.user').execPopulate((err,finalPost)=>{
                    post.comments.forEach(comment=>console.log({comment}))
                    if(err) return console.log(err)
                    return res.send({
                        status: 201,
                        post:finalPost,
                    });
                })

            })
        }
    })
}
const userPosts = (req,res) => {
    db.User.findOne({ name: req.params.slug }, (err,foundUser)=>{
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
                        return res.status(200).json({ data: foundPost })
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