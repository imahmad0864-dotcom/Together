const User = require('../models/userSchema')
const bcrypt = require('bcrypt')

const salt_rounds = 10
const hashpassword = async (password) =>{
    const hashed = await bcrypt.hash(password, salt_rounds)
    return hashed
}

const hash_verify = async (password, hashed_password) => {
    const ismatch = await bcrypt.compare(password, hashed_password)
    return ismatch
}

// signup handler function
const signup_handle = async(req,res) => {
    // collecting data
    const {name, email, password } = req.body
    
    // password hashing
    const hashed_password = await hashpassword(password)
    // creating new user
    const user = new User({
        "name": name,
        "email": email,
        "hashed_passowrd": hashed_password
    })
    // user saving
    user.save()
    // response
    return res.json(user)
}

const login_handler = async (req,res) => {
    // collecting data
    const {email, password} = req.body

    // finding user
    const user = await User.findOne({"email": email})
    // if user does not exist
    if (!user) return res.json({"error": "user not found"})

    const user_pass = user.hashed_passowrd

    // verifying user password
    const ismatch = await hash_verify(password, user_pass)
    // if not matched
    if(!ismatch) return res.json({"error": "incorrect credentials"})
    
    // returing response
    return res.json(user)
    
    
}

module.exports = {signup_handle, login_handler}