const { application } = require('express');
const express = require('express');

//creating app
const app = express();

app.use(express.static('public'));
app.get('/',(req,res) => {
    res.sendFile("public/index.html",{root: __dirname});
});

//make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port,() => {
    console.log(`Cart app listen at http://localhost:${port}`);
});

//pass requests to the router middleware
const router = require('./routes/post');
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

app.get('/login',(req,res) => {
    res.render('login');
});

app.get('/register',(req,res) => {
    res.render('register');
});

app.get('/api/catalog',(req,res) =>{
    res.render('catalog')
});
