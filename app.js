const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { response, request } = require('express');
const mysql = require('mysql2');
const { constants } = require('buffer');
const readline = require('readline');
const fs = require('fs');


dotenv.config({path: './.env'});

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});



app.use(express.urlencoded({ extended : false}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

const dbService = require('./dbService');
//const { delete } = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));


//define routes
app.use('/', require('./routes/pages.js'));
app.use('/auth', require('./routes/auth.js'));
app.use('/add', require('./routes/auth.js'));

//create
//app.post('/add_movies', (request, response) => {
//        
//});

//read 
//app.get("/get_movies", (request, response) => {
//    const db = dbService.getDbServiceInstance();
//    console.log('test');
// });

app.get('/moviesList', (req,res, error) => {
    db.query("select title,genre,movie_id from Movies where movie_id in (select movie_id from user_watchlist_movie where username = ?)",[req.session.username], (err,result) => {
        console.log(result);
        res.send(result);
    });

});

app.get('/sereisList', (req,res, error) => {
    db.query("select title,genre,series_id from Series where series_id in (select series_id from user_watchlist_series where username = ?)",[req.session.username], (err, result) => {
        if(err) {
            console.log(err);
        }
        console.log('series');
        console.log(result);
        res.send(result);
    });
});

app.delete('/moviesList/:id', (req, res, error) => {
    console.log('hello, hi');
    console.log(res);
    const { id } = req.params;
    db.query("delete from user_watchlist_movie where username = ? and movie_id = ?;", [req.session.username, id ], (err, result) => {
        if(err) {
            console.log(err);
        }
        console.log('delete');
        console.log(result);
        res.send('deleted');
    });
});

app.delete('/sereisList/:id', (req, res, error) => {
    console.log('hello, hi');
    console.log(res);
    const { id } = req.params;
    db.query("delete from user_watchlist_series where username = ? and series_id = ?;", [req.session.username, id ], (err, result) => {
        if(err) {
            console.log(err);
        }
        console.log('delete');
        console.log(result);
        res.send('deleted');
    });
});

app.get('/watchedMovieList', (req,res, error) => {
    db.query("SELECT m.title, m.genre, w.date from Movies m, watched_movie w WHERE w.movie_id = m.movie_id AND w.username = ?",[req.session.username], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.get('/watchedSeriesList', (req,res, error) => {
    db.query("SELECT m.title, m.genre, w.date, w.season from Series m, watched_series w WHERE w.series_id = m.series_id AND w.username = ?",[req.session.username], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.get('/seriesReview', (req,res, error) => {
    db.query("call procedure_review_series()", (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.get('/movieReview', (req,res, error) => {
    db.query("call procedure_review_movie()", (err, result) => {
        console.log('review movies');
        console.log(result);
        res.send(result);
    });
});

app.get('/', (req, res,error) => {
    res.send(error);
})

app.listen(process.env.PORT, () => console.log('App is running'));

module.exports = app;


