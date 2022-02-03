var x = document.getElementById('searches');
x.addEventListener('input', getmovies);


function getmovies() {
        console.log('hey');
        let searchText = document.getElementById('searches').value;
        let types = document.getElementById('type').value;
        console.log(searchText);
        console.log(types);
        //let type = document.getElementById('type').value;
        fetch('http://www.omdbapi.com/?s='+searchText+'&apikey=658036e4')    
        .then(res => res.json())
        .then(data => {
            
            console.log(data); 
            let movies = data.Search;
            var i=0;
            var x = 0;
            var output = '';
            for (; i < movies.length; i++) {
                x += 1;
                output += ` 
                <li>
                    <input type="radio" id="${x}" name="imdbId" id="${x} class="input-hidden" value= "${movies[i].imdbID}"/>
                    <label for="${x}">
                        <img src="${movies[i].Poster}" /> 
                        <h5>"${movies[i].Title}"</h5>
                        <a onclick="movieSelected('${movies[i].imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </label>
                </li>                 
                    
                `;
            }
            document.getElementById("movies-series").innerHTML = output;

            
        })
        .catch(err => console.log(err));
               
}
    function movieSelected(id){
        sessionStorage.setItem('movieId', id);
        window.location = '/movie.html';
        return false;
    }

    function getMovie() {
        let movieId = sessionStorage.getItem('movieId');
        fetch('http://www.omdbapi.com?i='+movieId+'&apikey=658036e4')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let output =`
                <div class="row">
                  <div class="col-md-4">
                    <img src="${data.Poster}" class="thumbnail">
                  </div>
                  <div class="col-md-8">
                    <h2>${data.Title}</h2>
                    <ul class="list-group">
                      <li class="list-group-item"><strong>Genre:</strong> ${data.Genre}</li>
                      <li class="list-group-item"><strong>Released:</strong> ${data.Released}</li>
                      <li class="list-group-item"><strong>Rated:</strong> ${data.Rated}</li>
                      <li class="list-group-item"><strong>IMDB Rating:</strong> ${data.imdbRating}</li>
                      <li class="list-group-item"><strong>Director:</strong> ${data.Director}</li>
                      <li class="list-group-item"><strong>Writer:</strong> ${data.Writer}</li>
                      <li class="list-group-item"><strong>Actors:</strong> ${data.Actors}</li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="well">
                    <h3>Plot</h3>
                    ${data.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-default">Go Back To Search</a>
                  </div>
                </div>
              `;
              document.getElementById('movie').innerHTML = output;                 
            })
            .catch(err => console.log(err));
        }

      