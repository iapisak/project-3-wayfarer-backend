const db= require('../models')

// Update user
const update =(req,res)=>{
    db.User.findByIdAndUpdate(req.params.id,req.body,{new:true},(error, updatedUser)=>{
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
    db.User.findOne({ name: req.params.slug }, (err, foundUser) => {
        if (err) return console.log(err);
        res.json({
            status: 200,
            count: 1,
            data: foundUser,
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

