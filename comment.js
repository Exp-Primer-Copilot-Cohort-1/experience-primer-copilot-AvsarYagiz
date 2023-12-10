// Create web server

var express = require('express');
var app = express();

// Set up handlebars view engine
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set up body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up session
var session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Set up database
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'student',
    password: 'default',
    database: 'student'
});

// Set up bcrypt
var bcrypt = require('bcrypt-nodejs');

// Set up passport
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// Set up flash
var flash = require('connect-flash');
app.use(flash());

// Set up google strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GOOGLE_CLIENT_ID = "1001523512821-6h1d0t0v5h8p9e8s9s8h8e9h6g3h4g6c.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "8n1Y9K2FQzHlO9oQ6oXc2s2H";
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        pool.query("SELECT * FROM user WHERE google_id = ?", [profile.id], function(err, rows) {
            if (err) {
                return done(err);
            }
            if (rows.length) {
                return done(null, rows[0]);
            } else {
                pool.query("INSERT INTO user (google_id, google_token, google_name, google_email) VALUES (?, ?, ?, ?)", [profile.id, accessToken, profile.displayName, profile.emails[0].value], function(err, rows) {
                    if (err) {
                        return