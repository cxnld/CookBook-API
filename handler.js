const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./model/User')
const verify = require('./routes/verifyToken')

// Import Routes
const authRoute = require('./routes/auth')
const recipesRoute = require('./routes/recipes')


mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, () => 
    console.log('connected to db!')
)

// Middleware
app.use(cors())
app.use(express.json())

// Route Middlewares
app.use('/auth', authRoute)
app.use('/recipes', recipesRoute)

// Get user data
app.get('/user', verify, (req, res) => {
    User.findById(
        req.user
    ).then(userData => 
        res.send(userData)
    )
})

//app.listen(3001, () => console.log(`Server listening on port 3001`))
module.exports.handler = serverless(app);