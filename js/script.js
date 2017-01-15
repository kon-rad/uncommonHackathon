//
// $.ajax({
//         url: "https://api.spotify.com/v1/tracks/3n3Ppam7vgaVa1iaRUc9Lp",
//         type:"GET",
//         async:false,
//         dataType: "json",
//         success:  $.getJSON(function(data) {
//         alert(data);
//       console.log(data);
//     });
//     });


$(document).ready(function(){

  $("#playlist-button").on("click", function() {
    $("#output").empty();
    searchTerm = $("#searchTerm").val();
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="
    + searchTerm + "&format=json&callback=?"
    wikiSearch(url);
  });


   function searchAlbums(url) {
    $.ajax({
      url: url,
      type: "GET",
      async: false,
      dataType: 'json',
      success: function(data, status, jqXHR) {
        for(var i = 0; i < data[1].length; i++) {
          $("#output").append("<div><div class='well'><a href=" + data[3][i] +
          "><h2>" + data[1][i] + "</h2>" + "<p>" + data[2][i] +
          "</p></a></div></div>");
        }
    }
  });
  };


var searchAlbums = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'album'
        },
        success: function (response) {
            console.log(response);
            resultsPlaceholder.innerHTML = template(response);
        }
    });
};


//Uses AJAX to read Spotify JSON files recieved from Spotify Track API
function loadTracks(trackName){

$.ajax({

  url:'https://api.spotify.com/v1/tracks/'+trackName,

  success: function(json){

  alert(json.name);
    }
    });

}

//On Document Ready it reads information from a file which holds all the static song
$(document).ready(function(){

var tracks = ["3n3Ppam7vgaVa1iaRUc9Lp", "7pPFNwM1ALSVU4nZfvHfn7", "3n3Ppam7vgaVa1iaRUc9Lp"];

for(var i=0;i<3;i++)
{
    loadTracks(tracks[i]);
}
randomTracks();

});
