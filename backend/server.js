require('dotenv').config()
const express = require('express')

// database
const connectdb = require('./config/db')

// routes
const authRoute = require('./routes/authRoute')

const app = express()
app.use(express.json())

connectdb()

// new user
app.use('/user', authRoute)


// health
app.get('/health', (req,res)=> {
    res.json({"status": 200, "health": "Running"})
})
const port = process.env.PORT || 8000 
app.listen(port , ()=> console.log(`app running on port: ${port}`))
