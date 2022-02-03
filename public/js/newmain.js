$(document).ready(() => {
    $('#searchForm').onchange((e) => {
      getMovies();
      e.preventDefault();
    });
  });

  function getMovies(){
    let searchText = $('#searchText').val();
    axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=658036e4')
      .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
          output += `
            <div class="col-md-3">
              <div class="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
              </div>
            </div>
          `;
        });
        $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}