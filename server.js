
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//get the port for the heroku app
//HEROKU sets PORT enviroment
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

//express middleware
app.use((req,res,next)=>{
    //add logger to log every request
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('logs.txt',log+' \n', (err)=>{
        if(err){
            console.log('Unable to append to logs.txt');
        }
    });
    next(); //only calling next completes
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        //currentYear: new Date().getFullYear().toString()
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        //currentYear: new Date().getFullYear().toString()
    });
});

app.listen(port, () => {
    console.log(`listening port : ${port}`);
});