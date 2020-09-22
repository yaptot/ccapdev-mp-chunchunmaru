const express = require('express')
const router = express()
const controller = require('../controller/controller')
const middleware = require('../middlewares/middleware')

//Get methods
router.get('/', controller.getHome)
router.get('/register', controller.getRegister)
router.get('/login', controller.getLogin)
router.get('/signout', controller.getSignout)
router.get('/mylist', controller.getMyList)
router.get('/browse', controller.getBrowse)
router.get('/search', controller.getSearch)
router.get('/genre/:genre', controller.getGenre)
router.get('/platform/:platform', controller.getPlatform)
router.get('/viewGame/:_id', controller.getViewGame)
router.get('/profile', controller.getProfile)

//Post methods
router.post('/register', controller.postRegister)
router.post('/login', controller.postLogin)
router.post('/addgame', controller.postAddGame)
router.post('/addList/:_id', controller.postAddList)
router.post('/deleteGame', controller.postDeleteGame)
router.post('/updateStatus/:_id', controller.postUpdateStatus)
router.post('/addReview/:_id', controller.postAddReview)

module.exports = router;