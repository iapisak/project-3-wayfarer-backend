const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

// ----- Routes -----//

// User Routes: Profile, Login, Logout, Update

// ----Delete the user
router.delete('/users/', ctrl.user.destroy )

// ----Route for Creating a new user
router.post('/users/create', ctrl.auth.createUser)

// -----Route for updating the user
router.put('/users/update',ctrl.user.update)

// --Route for logging out
router.get('/logout', ctrl.auth.logout)

router.post('/users/login', ctrl.auth.createSession)




// Comment Routes: Create, Update, Delete, Get
// -----Route for updating 



// Post Routes : Create, Update, Delete, Get 

module.exports = router;


