const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var request = require("request");
const e = require('express');

// const connection = require('/home/antash/binge-backend-js/dbService');
// const { connect } = require('/home/antash/binge-backend-js/dbService');
dotenv.config({path: './.env'});
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

db.connect(function (err) {
    if(err) {
        console.log(err);
    }
});

exports.login = async (req,res) => {
    console.log(req.body);
    try {
        const {userName, password} = req.body;
        
        if(userName && password) {
            db.query('SELECT * FROM User WHERE username = ? AND password = ?', [userName, password], function(error, results, fields) {
                if (results.length > 0) {
                    sessionData = req.session;
                  
                    sessionData.loggedin = true;
                    sessionData.username = userName;
                    console.log(req.session);
                    console.log(req.session.username);
                    res.redirect('/Home.html');
                } else {
                    res.send("Incorrect Username and/or Password!");
                }			
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    
    
    }
    catch(error) {
        console.log(error);
    }
}

exports.register = (req,res) => {
    console.log(req.body);

    const name = req.body.fullName;
    const age = req.body.age;
    const gender = req.body.answer;
    const userName = req.body.username;
    const password = req.body.password;
    const confirmPassword   = req.body.confirmPassword;
    console.log(userName);

    db.query('SELECT username FROM User WHERE username = ?', [userName], function (error, results) {

        if(error) {
            console.log(error); 
        }



        else {

            console.log(results.length);

            if ( results.length > 0 ) {
                return res.send('That user is already in use');
                //res.redirect('/index.html');
            }

            else if(password !== confirmPassword) {
                return res.send('Passwords donot match');
                //res.redirect('/index.html');
            }

            let hashPassword = bcrypt.hash(password, 8);
            console.log(hashPassword);

        db.query('INSERT INTO User SET ?', { username: userName, name: name, gender: gender, age: age, password: password}, (error, results) => {
            if(error) {
                console.log(error);
            }

            else {
                console.log(results);
                return res.send(`<a href = "/index.html"> <h2>User registerd </h2></a>`);
            }
        });
        console.log('bye');
    }
});
}

exports.addWatched = (req, res) => {
    console.log(req.body);
    const type = req.body.type;
    const season = req.body.seasons;
    const imdbId = req.body.imdbId;
    const rating = req.body.rating;
    const review = req.body.review;
    

    var queryString = "http://www.omdbapi.com?i=" + imdbId + "&apikey=658036e4";

    request(queryString, function(error, response, body){
        if(!error && response.statusCode == 200){
            var parseData = JSON.parse(body);
            //console.log(parseData["Search"][0]["Title"]);
            const title = parseData.Title; 
            const genre = parseData.Genre;
            const imdb_rating = parseData.imdbRating;
            const totalSeasons = parseData.totalSeasons;

            if (type == 'Movie') {
                db.query('SELECT movie_id FROM Movies WHERE movie_id = ?', [imdbId], (error, results) => {
                    

                    if(error) {
                        console.log(error);
                        res.send(`<a href="/Home.html"> ${error} </a>`);
                    }
    
                    else if(results.length>0) {
                    
                        db.query('SELECT * FROM watched_movie WHERE movie_id = ? AND username = ?', [imdbId, req.session.username], (error, result) => {
                            console.log(result);
                            console.log(req.session);
                            if(error) {
                                console.log(error);
                                res.send(`<a href="/Home.html"> ${error} </a>`);
                            }

                            else if(result.length > 0 ) {
                                console.log(req.session);
                                res.send(`<a href="/Home.html"> Movie already added</a>`);
                            }

                            else {
                                db.query('INSERT INTO watched_movie SET ?', {username: req.session.username, movie_id: imdbId, }, (err) => {
                                    if(err) {
                                        console.log(err);
                                        res.send(`<a href="/Home.html"> ${error} </a>`);
                                    }
                                    db.query('INSERT INTO Review_Movies SET ?', {movie_id:imdbId, username: req.session.username, rating: rating, review: review}, (err) => {
                                        if(err) {
                                            console.log(err);
                                            res.send(`<a href="/Home.html"> ${error} </a>`);
                                        }
                                    });       
                                });
                                res.send(`<a href="/Home.html"> Movie added</a>`);
                            }
                     
                        });
                    }

                    else {
                        db.query('INSERT INTO Movies SET ?', {movie_id: imdbId, title: title, genre: genre, imdb_rating: imdb_rating}, (error, result) => {
                            console.log(result);
                            console.log('')
                            if(error) {
                                console.log(error);
                                res.send(`<a href="/Home.html"> ${error} </a>`);
                            }
                    
                            db.query('INSERT INTO watched_movie SET ?', {username: req.session.username, movie_id: imdbId}, (error) => {
                                if(error) { 
                                    console.log(req.session);
                                    console.log(error);
                                    res.send(`<a href="/Home.html"> ${error} </a>`);
                                }
                                db.query('INSERT INTO Review_Movies SET ?', {movie_id:imdbId, username: req.session.username, rating: rating, review: review}, (err) => {
                                    if(err) {
                                        console.log(err);
                                        res.send(`<a href="/Home.html"> ${error} </a>`);
                                    }
                                });
                                    
                            });
                            res.send(`<a href="/Home.html"> Movie added</a>`);
                        });
    
                    }
                    
                });
            }

            else if(type == 'Series') {

                db.query('SELECT series_id FROM Series WHERE title = ?', [parseData.Title], (error, results) => {
                    
    
                    if(error) {
                        console.log(error);
                        res.send(`<a href="/Home.html"> ${error} </a>`);
                    }
    
                    else if(results.length>0) {
                        db.query('SELECT * FROM watched_series WHERE series_id = ? AND username = ?', [imdbId, req.session.username], (error, result) => {
                            
                            console.log(result);
                            console.log(req.session);
                            if(error) {
                                console.log(error);
                                res.send(`<a href="/Home.html"> ${error} </a>`);
                            }

                            else if(result.length > 0 ) {
                                console.log(req.session);
                                res.send(`<a href="/Home.html"> Series already added</a>`);
                            }

                            else {
                                db.query('INSERT INTO watched_series SET ?', {username: req.session.username, series_id: imdbId, season: season}, (err) => {
                                    if(err) {
                                        console.log(err);
                                        res.send(`<a href="/Home.html"> ${error} </a>`);
                                    }   
                                    db.query('INSERT INTO Review_Series SET ?', {series_id:imdbId, username: req.session.username, rating: rating, review: review}, (err) => {
                                        if(err) {
                                            console.log(err);
                                            res.send(`<a href="/Home.html"> ${error} </a>`);
                                        }
                                    });
                                    res.send(`<a href="/Home.html"> Series added</a>`);    
                                });
                            }

                        });
                    }

                    else {
                        db.query('INSERT INTO Series SET ?', {
                            series_id: imdbId, title: title, genre: genre,season: totalSeasons,  imdb_rating: imdb_rating}, 
                            (error, result) => {
                            if(error) {
                                console.log(error);
                                res.send(`<a href="/Home.html"> ${error} </a>`);
                            }
    
                            else {
                                db.query('INSERT INTO watched_series SET ?', 
                                {username: req.session.username, series_id: imdbId, season: season}, 
                                (error) => {
                                    if(error) { 
                                        console.log(req.session);
                                        console.log(error);
                                        res.send(`<a href="/Home.html"> ${error} </a>`);
                                    }

                                    else {
                                        db.query('INSERT INTO Review_Series SET ?', {series_id:imdbId, username: req.session.username, rating: rating, review: review}, (err) => {
                                            if(err) {
                                                console.log(err);
                                                res.send(`<a href="/Home.html"> ${error} </a>`);
                                            }
                                        });                                    
                                    }
    
                                    res.send(`<a href="/Home.html">Series added</a>`);    
                                });
                            }
                        });
                    }
                });
            }
            
            else {
                res.send(`<a href="/Home.html">Add type</a>`);
            }

            //res.send('movie added');
        }
    });


}
