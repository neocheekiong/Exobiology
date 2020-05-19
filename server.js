/**
 * Dependencies
 */
const express = require('express');
const methodOverride = require('method-override');
const scientists = require('./models/index');

/**
 * Configuration
 */
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

/**
 * Middleware
 */
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'));

/**
 * Routes
 */
app.get('/new', (request, response) => {
    response.render('new.ejs');
});

app.post('/new', (request, response)=>{
    scientists.push(request.body);
    response.redirect('/index');
});

app.get('/index', (request, response) => {
    response.render('index.ejs', {
        data: scientists
    });
});

app.delete('/index/:index', (request, response) => {
    scientists.splice(request.params.index, 1);
    response.redirect('/index');
});

app.put('/index/:index', (request, response) => {
    scientists[request.params.index] = request.body;
    response.redirect('/index');
});

app.get('/index/:index/edit', (request, response) => {
    response.render('edit.ejs', { 
        scientist: scientists[request.params.index],
        index: request.params.index
    });
});



/**
 * Port Listener
 */
app.listen(port, () => 
{
    console.log('Discovering new worlds on port', port);
});
