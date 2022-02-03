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

exports.addWatch = (req, res) => {
    console.log(req.body);
    const type = req.body.type;
    const imdbId = req.body.imdbId;
    console.log(imdbId);
    var queryString = "http://www.omdbapi.com?i=" + imdbId + "&apikey=658036e4";

    request(queryString, function(error, response, body){
        if(!error && response.statusCode == 200){
            var parseData = JSON.parse(body);
            //console.log(parseData["Search"][0]["Title"]);
            const title = parseData.Title; 
            const genre = parseData.Genre;
            const imdb_rating = parseData.imdbRating;
            const totalSeasons = parseData.totalSeasons;
            if(error){
                console.log(error);
            }

            if (type == 'movie') {
                db.query('SELECT movie_id FROM Movies WHERE title = ?', [title], (error, results) => {
                    

                    if(error) {
                        console.log(error);
                    }
    
                    else if(results.length>0) {
                    
                        db.query('SELECT * FROM user_watchlist_movie WHERE movie_id = ? AND username = ?', [imdbId, req.session.username], (error, result) => {
                            console.log(result);
                            console.log(req.session);
                            if(error) {
                                console.log(error);
                            }

                            else if(result.length > 0 ) {
                                console.log(req.session);
                                res.send(`<a href="/Home.html"> Movie already added</a>`);
                            }

                            else {
                                db.query('INSERT INTO user_watchlist_movie SET ?', {username: req.session.username, movie_id: imdbId}, (err) => {
                                    if(err) {
                                        console.log(err);
                                    }   
                                    res.send(`<a href="/Home.html"> Movie added</a>`);    
                                });
                            }

                        });
                    }

                    else {
                        db.query('INSERT INTO Movies SET ?', {movie_id: imdbId, title: title, genre: genre, imdb_rating: imdb_rating}, (error, result) => {
                            console.log(result);
                            console.log('')
                            if(error) {
                                console.log(error);
                            }
                    
                            db.query('INSERT INTO user_watchlist_movie SET ?', {username: req.session.username, movie_id: imdbId}, (error) => {
                                if(error) { 
                                    console.log(req.session);
                                    console.log(error);
                                }    
                            });
                            res.send(`<a href="/Home.html"> Movie added</a>`);
                        });
                    }
                    
                });
            }

            else if(type == 'series') {

                db.query('SELECT series_id FROM Series WHERE title = ?', [parseData.Title], (error, results) => {
                    
    
                    if(error) {
                        console.log(error);
                    }
    
                    else if(results.length>0) {
                        db.query('SELECT * FROM user_watchlist_series WHERE series_id = ? AND username = ?', [imdbId, req.session.username], (error, result) => {
                            
                            console.log(result);
                            console.log(req.session);
                            if(error) {
                                console.log(error);
                            }

                            else if(result.length > 0 ) {
                                console.log(req.session);
                                res.send(`<a href="/Home.html"> Series already added</a>`);
                            }

                            else {
                                db.query('INSERT INTO user_watchlist_series SET ?', {username: req.session.username, series_id: imdbId}, (err) => {
                                    if(err) {
                                        console.log(err);
                                    }   
                                    res.send(`<a href="/Home.html"> Series added</a>`);    
                                });
                            }

                        });
                    }

                    else {
                        db.query('INSERT INTO Series SET ?', {series_id: imdbId, title: title, genre: genre,season: totalSeasons,  imdb_rating: imdb_rating}, (error, result) => {
                            if(error) {
                                console.log(error);
                            }
    
                            console.log(result);
                            db.query('INSERT INTO user_watchlist_series SET ?', {username: req.session.username, series_id: imdbId}, (error) => {
                                if(error) { 
                                    console.log(req.session);
                                    console.log(error);
                                }
                                res.send(`<a href="/Home.html">Series added</a>`);    
                            });
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
