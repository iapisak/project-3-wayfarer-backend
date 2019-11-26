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
router.put('/users/:id/update',ctrl.user.update)

// --Route for logging out
router.get('/logout', ctrl.auth.logout)

router.post('/users/login', ctrl.auth.createSession)

router.get('/users/', ctrl.user.index );

router.get('/users/:id/posts', ctrl.post.userPosts);

router.get('/users/:id', ctrl.user.getUserInfo);


// Comment Routes: Create, Update, Delete, Get
// -----Route for updating



// Post Routes : Create, Update, Delete, Get
router.post('/cities/:city_slug/posts/new/',ctrl.post.createPost);

router.get('/posts/', ctrl.post.allPosts)

router.get('/posts/:postId/', ctrl.post.getPost)

router.delete('/posts/:postId/delete/', ctrl.post.deletePost);

// Cities //

router.post('/cities/new/', ctrl.city.createcity)

router.get('/cities/', ctrl.city.allCities)
router.get('/cities/:city_slug/posts/', ctrl.city.allPostsOfCity)
router.put('/posts/:post_id/edit/', ctrl.city.editPosts)
router.get('/user/posts/:post_id/', ctrl.city.userAllPosts)

//COMMENT
router.post('/comment/:postId/',ctrl.comment.createComment)
router.delete('/delete/:city_id', ctrl.city.deleteAll)

module.exports = router;


