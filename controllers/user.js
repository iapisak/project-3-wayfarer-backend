const db= require('../models')

// Update user
const update =(req,res)=>{
    db.User.findByIdAndUpdate(req.body._id,req.body,{new:false},(error, updatedUser)=>{
        if(error)return console.log(error);
        res.json({
            status: 200,
            data: updatedUser,
            requestedAt: new Date().toLocaleString(),
        });
    });
}

// Delete User
const destroy = (req,res)=>{
    db.User.findByIdAndDelete(req.body._id,(error,deletedUser)=>{
        if(error)return console.log(error);
        res.json({
            status: 200,
            count: 1,
            data : deletedUser,
            requestedAt: new Date().toLocaleString()
        });
    });
}

// Show all users

const index = (req,res)=>{
    db.User.find({},(error,foundUsers)=>{
        if(error) return console.log(error);
        res.json({
            status: 200,
            count: 1,
            data : foundUsers,
            requestedAt: new Date().toLocaleDateString()
        })
    })
};

const getUserInfo = (req, res) => {
    db.User.findOne({ _id: req.params.id }, (err, foundUser) => {
        if (err) return console.log(err);
        let { posts, ...userInfo } = foundUser;
        res.json({
            status: 200,
            count: 1,
            data: userInfo,
            requestedAt: new Date().toLocaleDateString(),
        });
    })
};

module.exports = {
    destroy,
    update,
    index,
    getUserInfo,
}

