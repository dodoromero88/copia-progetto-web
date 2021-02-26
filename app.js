//dipendenze di node per fare applicazioni web
//var fs = require('fs');
const express = require('express'); // framework
var partials   = require('express-partials');
//var bodyParser = require('body-parser');
var session = require('express-session');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var engine = require('ejs-locals');
var path = require('path');

// importiamo il modulo nodemailer per inviare una email di contatto
const nodemailer = require('./module/nodemailer.js');


const app = express();


app.set('views',path.join(__dirname + '/views'));
app.engine('ejs',engine);
//Generatore di Template
app.set('view engine','ejs');
app.use(partials());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.json());                        
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



//route index
app.get('/',function(req,res){
    res.render('index',{title: 'Althea'});
});

//route user
app.get('/login',function(req,res){
    res.render('login',{title: 'Log-in'});
});

app.post('/login',function(req,res){
    res.render('login',{title: 'Log-in'});
});

//route admin
app.get('/admin',function(req,res){
    res.render('admin',{title: 'Admin'});
});




// app.get('/users',function(req,res){
//     res.render('user',{title: 'Protect Area '});
// });

app.post('/user', function(req,res){
    //console.log(req);
    user = req.body.email;
    password = req.body.password;
    console.log("user inserito=",user,"password inserita =",password);
    session = req.session;
    res.render('user',{title: 'Protect Area '});
});


// codice temporaneo per pagin admin (intanto lasciamo qst, c'è qualcosa che non va)
app.post('/users',function(req,res){
   // res.redirect('https://console.firebase.google.com/u/0/project/fireproject-13ab0/');
   res.render('users',{title:'Private Area'})
/**
 * potrei mettere un richiamo ad una pagina di template dove ho tutti gli utenti
 */
});


//route Prenotazione
app.get('/booking',function(req,res){
    res.render('booking',{title: 'Prenotazione'});
});

//route signup
app.get('/signup',function(req,res){
    res.render('signup',{title: 'Sign-up'});
});


//route info 
app.get('/info',function(req,res){
    res.render('info',{title: 'Info'});
});

//info page request contact with email
app.post('/contact',function(req,res){
    nodemailer.sendContactMail(req,res);
    
});
//end route info 



//Inizializio il server
var port = 3000;
app.listen(port,function(){
    console.log("Live ar Port 3000");
    
});

