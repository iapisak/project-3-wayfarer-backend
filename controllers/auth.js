const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const db = require('../models')

// POST Create User
const createUser = (req, res) => {
    const {name,email,currentCity,joinDate,slug} = req.body
    db.User.findOne({email},(err,foundUser)=>{
    if(err){
        res.json({
            status:400,
            err,
        })
        return
    }
    if(foundUser){
        res.json({
            status:400,

        })
        return
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).json({
          status: 500,
          error: [{ message: 'The was an error, please try again' }],
        });
        // Bcrypt takes password and salt
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) return res.status(500).json({
            status: 500,
            error: [{ message: 'The was an error, please try again' }],
          });
          const newUser = {
            name,
            email,
            password: hash,
            currentCity,
            joinDate,
            slug,
          };

          db.User.create(newUser, (err, createdUser) => {
            if (err) return res.status(500).json({
              status: 500,
              error: [{ message: 'The was an error, please try again' }],
            });

            res.status(201).json({
              status: 201,

            });
          });
        });
      })
    })
};


const createSession = (req, res) => {
  console.log('yeeter')
        console.log(req.body)
        db.User.findOne({ email: req.body.email }, (err, foundUser) => {
          if (err) return res.status(500).json({
            status: 500,
            error: [{ message: 'Something went wrong. Please try again' }],
          });

          // If no user is found by email address
          if (!foundUser) return res.status(400).json({
            status: 400,
            error: [{ message: 'Username or password is incorrect' }],
          });

          bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({
              status: 500,
              error: [{ message: 'Something went wrong. Please try again' }],
            });

            if (isMatch) {
              req.session.currentUser = foundUser._id;
              console.log(req.session)
              return res.status(201).json({
                status: 201,
                data: { id: foundUser._id, name: foundUser.name },
              });
            } else {
              return res.status(400).json({
                status: 400,
                error: [{ message: 'Username or password is incorrect' }],
              });
            }
          });
        });

};

const logout = (req,res) => {
  console.log('logged out')
    req.session.destroy(err => {
      if(err){
        res.json({status:400,data:[err]})
        return console.log(err)

      }
      res.redirect('/')
    })
  }
module.exports = {
    createUser,
    createSession,
    logout


}