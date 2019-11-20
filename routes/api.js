const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/user')

// ----- Routes -----//

// User Routes: Profile, Login, Logout, Update
// ----Route for grabbing the user
router.get('/users',ctrl.index)

// ----Delete the user
router.delete('/users/:id', ctrl.destroy )

// ----Route for Creating a new user
router.post('/users/create', ctrl.create)

// -----Route for updating the user
router.put('/users/:id/update',ctrl.update)



// Comment Routes: Create, Update, Delete, Get
// -----Route for updating 



// Post Routes : Create, Update, Delete, Get 

module.exports = router;


