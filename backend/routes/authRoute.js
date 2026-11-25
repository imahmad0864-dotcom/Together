const express = require('express')
const router = express.Router()

const {signup_handle, login_handler} = require('../controllers/authController')



// signup route
router.post('/signup', async (req,res) => await signup_handle(req,res))

// login route
router.post('/login', async (req,res) => await login_handler(req,res))
module.exports = router
