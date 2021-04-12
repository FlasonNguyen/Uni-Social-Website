const passport = require('passport')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('./models/user')

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        email = profile.emails[0].value
        console.log(profile.emails[0].value)
        if(email.includes('@student.tdtu.edu.vn')) console.log('true')
        else err = "NOT STUDENT MAIL"
        return done(err, user);
    });
}))