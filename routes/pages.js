const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(path.join('/../views/index.html'));
    res.sendFile(path.join(__dirname + '/../views/index.html'));

});

router.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/register.html'));
});

router.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/index.html'));
});

router.get('/Home.html', (req,res) => {
    console.log(typeof req.session.username);
    res.sendFile(path.join(__dirname + '/../views/Home.html'))
})

router.get('/movie.html', (req,res) => {
    res.sendFile(path.join(__dirname + '/../views/movie.html'))
})

router.get('/watched.html', (req,res) => {
    res.sendFile(path.join(__dirname + '/../views/watched.html'))
})

router.get('/signIn.html', (req,res) => {
    res.sendFile(path.join(__dirname + '/../views/signIn.html'))
})

router.get('/moviesList.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/moviesList.html'))  
})

router.get('/sereisList.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/sereisList.html'))  
})

router.get('/watchedMovieList.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/watchedMovieList.html'))  
})

router.get('/watchedSeriesList.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/watchedSeriesList.html'))  
})

router.get('/seriesReviews.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/seriesReviews.html'))  
})

router.get('/movieReviews.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/movieReviews.html'))  
})

module.exports = router;
