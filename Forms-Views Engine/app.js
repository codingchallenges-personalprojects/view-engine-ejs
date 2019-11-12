let express = require('express');

// bodyParser middleware to handle the passing of our POST data to the req object
let bodyParser = require('body-parser');

let fs = require('fs');

let { check, validationResult } = require('express-validator/check');

// let expressSession = require('express-session');

let app = express();

// bodyParser middleware to handle the passing of our POST data to the req object
let urlencodedParser = bodyParser.urlencoded({extended: false});


// Set up template engine
app.set('view engine', 'ejs');

// Serving Static files
app.use(express.static('./public'));

// Responding to requests
// Home page request
app.get('/', function(req, res) {
    res.render('index.ejs', { error: '' });
});

// Gallery page request
app.get('/gallery', function(req, res) {
    res.render('gallery.ejs', { error: '' });
});

// flyer page request
app.get('/flyer', function(req, res) {
    res.render('flyer.ejs', { error: '' });
});

// about us page request
app.get('/about-us', function(req, res) {
    res.render('about-us.ejs', { error: '' });
});

// POST request for submitting the form
app.post('/contact-form', urlencodedParser,[ 
    check('name', 'Please enter a valid name').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail()],
    function(req, res) {
        // Check the validation of user inputs
        const errors = validationResult(req);
        console.log(errors.mapped());
        // console.log(req.body);
        // Showing the error in case of invalid user inputs
        if (!errors.isEmpty()) {
            res.render('index', { error: errors.mapped() });
        }

        // logging the name and email to a log file every time a form is summitted
        fs.writeFile('log.txt', `name: ${req.body.name} , email: ${req.body.email}`, function(err, res) {
            console.log(err);
        })

        // redirect the user to the thank you page
        res.render('form-thank', { name: req.body.name, email: req.body.email, error: '' });
});


// Listen to port 3000
app.listen(3000);
console.log('You are listening to port 3000');



// https://github.com/validatorjs/validator.js#validators
// https://express-validator.github.io/docs/