const db= require('../models')

const allCities = (req, res) => {
    db.City.find({}, (err, foundCity) => {
        if (err) return res.status(500).json({ error: "Could not find Cities" })
        res.json({ status: 200, data: foundCity,})
    })
}

const allPostsOfCity = (req, res) => {
    db.City.findOne({ slug: req.params.city_slug }, (err, foundCity) => {
        if (err) return res.status(500).json({ error: "Could not find Cities" })
        if (foundCity) {
            foundCity.populate('posts').execPopulate((err, city) => {
                if (err) return res.status(500).json({ error: "Could not find Posts" });
                city.populate('posts.user').execPopulate((err, post) => {
                    if (err) return res.status(500).json({ error: 'could not double populate' });
                    res.status(200).json({ posts: city.posts })
                })
            })
        }
    })
}

const editPosts = (req, res) => {
    const {user,...edit} = req.body
    db.Post.findOneAndUpdate({_id:req.params.post_id,user}, edit, {new: true}, (err, updatePost) => {
        if (err ) return res.status(500).json({ error: "Could not find this Posts" })
        if (updatePost) return res.json({ status:200, data: updatePost })
        else return res.json({message:"post not found"})
    })
}

const userAllPosts = (req, res) => {
    db.User.findById(req.params.user_id, (err, foundUser) => {
        if (err) return res.status(500).json({ error: "Could not find this User" })
        foundUser.populate("posts").execPopulate((err, foundPosts) => {
            if (err) return res.status(500).json({ error: "Could not find Posts"})
            res.json({ status: 200, data: foundPosts})
        })
    })
}

const createcity = (req, res) => {
    db.City.create(req.body, (err, createEvent) => {
        if (err) return res.status(500).json({ error: "Could not create this city"})
        res.json({ status: 200, data: createEvent })
    })
}

const deleteAll = (req, res) => {
    db.Comment.deleteMany({}, (err, deleteAll) => {
        if (err) return res.status(500).json({ error: "Could not create this event"})
        res.json({ status: 200, data: deleteAll })
    })
}

const allComment = (req, res) => {
    db.Comment.find({}, (err, foundCity) => {
        if (err) return res.status(500).json({ error: "Could not find Cities" })
        res.json({ status: 200, data: foundCity,})
    })
}

module.exports = {
    allCities,
    allPostsOfCity,
    editPosts,
    userAllPosts,
    createcity,
    deleteAll,
    allComment,
}