const express = require('express')
const passport = require('passport')
const db = require('./db')
require('dotenv').config()

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false}))

//---------------------------------------------GOOGLE OAUTH2------------------------------------------------------------
// Initializes passport and passport sessions
app.use(passport.initialize())
app.use(passport.session())

require('./googleoauth2')

app.use('/auth/google', require('./route/google'))
//---------------------------------------------GOOGLE OAUTH2------------------------------------------------------------


app.use('/', require('./route/index'))
app.use('/login', require('./route/login'))


app.listen(8080, () => console.log('http://localhost:8080'))