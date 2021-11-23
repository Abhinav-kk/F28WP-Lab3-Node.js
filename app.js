const { application } = require('express');
const express = require('express');

//creating app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const session = require('express-session');
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))

app.use(express.static(__dirname + '/public'));
app.get('/',(req,res) => {
    res.sendFile("public/index.html",{root: __dirname});
});

//Render the contacts file in the /contacts route
app.get("/login", (req, res) => {
    res.render('login');
});

//Render the contacts file in the /contacts route
app.get("/register", (req, res) => {
    res.render('register');
});

//make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port,() => {
    console.log(`Cart app listen at http://localhost:${port}`);
});

//pass requests to the router middleware
const router = require('./routes/apis');
app.use(router);

//handling static HTML and EJS templates
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('index');
})

//route for contacts
app.get('/contacts',(req,res) => {
    res.render('contacts');
});

//route for catalog
app.get('/api/catalog',(req,res) =>{
    res.render('catalog')
});
