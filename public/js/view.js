function viewMovie() {

fetch('/moviesList')
.then(res => res.json())
.then(body => {

    console.log(body);
    console.log('hello huys ~~~');
    var i=0;
    var x =0;
    var output = '';
    for(; i<body.length; i++) {
        x += 1;
        output += `
        <tr>
            <td>${x}</td>
            <td>${body[i].title}</td>
            <td>${body[i].genre}</td>
            <td> <button class="delete-row-btn" data-id= ${body[i].movie_id}>remove</button></td> 
        </tr>`;
    }

    document.getElementById('movies').innerHTML = output;

})
.catch(err => console.log(err));
}


document.querySelector('table tbody').addEventListener('click', function(event){
    console.log(event.target.className === "delete-row-btn");
    if(event.target.className === "delete-row-btn") {
        removeData(event.target.dataset.id);
    }

    if(event.target.className === "delete-series-row-btn") {
        removeSeriesData(event.target.dataset.id);
    }
});

function removeData(id) {
    fetch('/moviesList/' + id, {
        method: 'DELETE',
    })
    .then(body => {
        console.log(body);
        if (body.ok) {
            location.reload();
        }
    })
    .catch(err => console.log(err));

}

function removeSeriesData(id) {
    fetch('/sereisList/' + id, {
        method: 'DELETE',
    })
    .then(body => {
        console.log(body);
        if (body.ok) {
            location.reload();
        }
    })
    .catch(err => console.log(err));

}

function viewSeries() {

    fetch('/sereisList')
    .then(res => res.json())
    .then(data => {
    
        console.log(data);
        console.log('hello huys ~~~');
        var i=0;
        var x = 0;
        var output = '';
        for(; i<data.length; i++) {
            x += 1;
            output += `
            <tr>
                <td>${x}</td>
                <td>'${data[i].title}'</td>
                <td>'${data[i].genre}'</td>
                <td> <button class="delete-series-row-btn" data-id= '${data[i].series_id}'>remove</button></td>
            </tr>`;                                                                                                                                   
        }
    
        document.getElementById('movies').innerHTML = output;

    })
    .catch(err => console.log(err));
}
    
function viewWatchedMovie() {

    fetch('/watchedMovieList')
    .then(res => res.json())
    .then(data => {
    
        console.log(data);
        console.log('hello huys ~~~');
        var i=0;
        var x =0;
        var output = '';
        for(; i<data.length; i++) {
            x += 1;
            output += `
            <tr>
                <td>${x}</td>
                <td>${data[i].title}</td>
                <td>${data[i].genre}</td>
                <td>${data[i].date}</td>
            </tr>`;
        }
    
        document.getElementById('movies').innerHTML = output;
    
    })  
    .catch(err => console.log(err));
}

function viewSeriesReview() {

    fetch('/seriesReview')
    .then(res => res.json())
    .then(data => {
    
        console.log(data);
        console.log('hello huys ~~~');
        var i=0;
        var x =0;
        var output = '';
        for(; i<data.length; i++) {
            x += 1;
            output += `
            <tr>
                <td>${x}</td>
                <td>${data[i].username}</td>
                <td>${data[i].title}</td>
                <td>${data[i].genre}</td>
                <td>${data[i].rating}</td>
                <td>${data[i].review}</td>
            </tr>`;
        }
    
        document.getElementById('movies').innerHTML = output;
    
    })  
    .catch(err => console.log(err));
}

function viewWatchedSeries() {

    fetch('/watchedSeriesList')
    .then(res => res.json())
    .then(data => {
    
        console.log(data);
        console.log('hello huys ~~~');
        var i=0;
        var x =0;
        var output = '';
        for(; i<data.length; i++) {
            x += 1;
            output += `
            <tr>
                <td>${x}</td>
                <td>${data[i].title}</td>
                <td>${data[i].genre}</td>
                <td>${data[i].season}</td>
                <td>${data[i].date}</td>
            </tr>`;
        }
    
        document.getElementById('movies').innerHTML = output;
    
    })  
    .catch(err => console.log(err));
}

function viewReviewSeries() {

    fetch('/seriesReview')
    .then(res => res.json())
    .then(data => {
    
        console.log(data);
        console.log('hello huys ~~~');
        var i=0;
        var series = data[0];
        var x =0;
        var output = '';
        for(; i<series.length; i++) {
            x += 1;
            output += `
            <tr>
                <td>${x}</td>
                <td>${series[i].username}</td>
                <td>${series[i].title}</td>
                <td>${series[i].genre}</td>
                <td>${series[i].rating}</td>
                <td>${series[i].review}</td>
                <td>${series[i].user_rating}</td>
            </tr>`;
        }
    
        document.getElementById('movies').innerHTML = output;
    
    })  
    .catch(err => console.log(err));
}

function viewReviewMovies() {

    fetch('/movieReview')
    .then(res => res.json())
    .then(data => {
    
        console.log(data);
        console.log('hello huys ~~~');
        var i=0;
        let movies = data[0]; 
        var x =0;
        var output = '';
        for(; i<movies.length; i++) {
            x += 1;
            output += `
            <tr>
                <td>${x}</td>
                <td>${movies[i].username}</td>
                <td>${movies[i].title}</td>
                <td>${movies[i].genre}</td>
                <td>${movies[i].rating}</td>
                <td>${movies[i].review}</td>
                <td>${movies[i].user_rating}</td>
            </tr>`;
        }
    
        document.getElementById('movies').innerHTML = output;
    
    })  
    .catch(err => console.log(err));
}

function formValidation() {
    fetch('/auth/login')
    .then(res => res.json())
    .then(body => {
        console.log(body);
        output = `alert(${body})`;

        document.getElementById('box').innerHTML = output;

    })
    .catch(err => console.log(err));
}