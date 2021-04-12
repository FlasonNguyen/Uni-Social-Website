const express = require('express')
const {validationResult} = require('express-validator')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('login')
})
//LOGIN HANDLE
router.post('/',(req, res) => {
    const {email, password} = req.body
    let errors = []
    if(!email || !password) {
        errors.push({msg: 'Please fill in all fields'})
    }
    else {
        User.findOne({email: email})
            .then(user => {
                if(!email) {
                    errors.push({msg: 'Your email NOT exist'})
                }
                return bcrypt.compare(password, user.password)
            })
            .then(passwordMatch => {
                if(!passwordMatch) {
                    return res.status(401).json({code: 3, message: 'Login failed, wrong password'})
                }
                return res.status(200).json({code: 0, message: 'Login successed'})
            })
    }
    if(errors.length > 0) {
        res.render('login', {errors})
    }else res.send('NICEEEE')
})

module.exports = router