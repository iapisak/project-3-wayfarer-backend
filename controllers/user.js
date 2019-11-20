const db= require('../models')


// Create User
const create = (req,res)=>{
    const user= {
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
        currentCity :req.body.currentCity
    }
    db.User.create(user,(error,newUser)=>{
        if(error) return console.log(error);
        res.json({
            status: 201,
            data: newUser,
            dateCreated: new Date().toLocaleString()
        });
    });
};



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
    db.User.findByIdAndDelete(req.params.id,(error,deletedUser)=>{
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
}

module.exports = {
    destroy,
    update,
    create,
    index
}

