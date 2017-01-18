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

//
// $(document).ready(function(){
//
//   $("#playlist-button").on("click", function() {
//     $("#output").empty();
//     searchTerm = $("#searchTerm").val();
//     var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="
//     + searchTerm + "&format=json&callback=?"
//     wikiSearch(url);
//   });
//
//
//    function searchAlbums(url) {
//     $.ajax({
//       url: url,
//       type: "GET",
//       async: false,
//       dataType: 'json',
//       success: function(data, status, jqXHR) {
//         for(var i = 0; i < data[1].length; i++) {
//           $("#output").append("<div><div class='well'><a href=" + data[3][i] +
//           "><h2>" + data[1][i] + "</h2>" + "<p>" + data[2][i] +
//           "</p></a></div></div>");
//         }
//     }
//   });
//   };
//
//
// var searchAlbums = function (query) {
//     $.ajax({
//         url: 'https://api.spotify.com/v1/search',
//         data: {
//             q: query,
//             type: 'album'
//         },
//         success: function (response) {
//             console.log(response);
//             resultsPlaceholder.innerHTML = template(response);
//         }
//     });
// };


//Uses AJAX to read Spotify JSON files recieved from Spotify Track API
// function loadTracks(trackName){
//
// $.ajax({
//
//   url:'https://api.spotify.com/v1/tracks/'+trackName,
//
//   success: function(json){
//
//   // alert(JSON.stringify(json));
//     }
//     });
//
// }
//
// //On Document Ready it reads information from a file which holds all the static song
// $(document).ready(function(){
//
// var tracks = ["3n3Ppam7vgaVa1iaRUc9Lp", "7pPFNwM1ALSVU4nZfvHfn7", "3n3Ppam7vgaVa1iaRUc9Lp"];
//
// for(var i=0;i<3;i++)
// {
//     loadTracks(tracks[i]);
// }
// // randomTracks();
//
// });


function openNav() {
    document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}

function loadTracks(trackName){

$.ajax({

 url:'https://api.spotify.com/v1/tracks/'+trackName,

success: function(json){

console.log(json.name);
 var s= JSON.stringify(json);
 var arr = s.split("name");
 var arr1 = arr[1].split("type");
 console.log(arr1[0].replace(":","").replace(/"/g,"").replace(",",""));

  }
    });

}

$(document).ready(function() {

  // Toggles Music Therapy Playlist when "Generate Playlist" button is pressed
  $("#ifrme-button").click(function(){
    $("#iframe-playlist").toggleClass("display");
  })

  //Uses AJAX to read Spotify JSON files recieved from Spotify Track API
  var tracks = ["3n3Ppam7vgaVa1iaRUc9Lp", "7pPFNwM1ALSVU4nZfvHfn7", "3n3Ppam7vgaVa1iaRUc9Lp"];

  for(var i=0;i<3;i++)
  {
      loadTracks(tracks[i]);
  }

    var count= 001;
// find template and compile it
var templateSource = document.getElementById('results-template').innerHTML,
    template = Handlebars.compile(templateSource),
    resultsPlaceholder = document.getElementById('results'),
    soundtrackList = document.getElementById('life-soundtrack-list'),
    playingCssClass = 'playing',
    audioObject = null;

var fetchTracks = function (albumId, callback) {
    $.ajax({
        url: 'https://api.spotify.com/v1/albums/' + albumId,
        success: function (response) {
            callback(response);
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
          resultsPlaceholder.innerHTML = template(response);
            //divToReplace.innerHTML = template(response);
        }
    });
};

results.addEventListener('click', function (e) {

    var target = e.target;
    var id = e.target.id;
     console.log(id);
      var divIWant = document.getElementById(id);
      $("#life-soundtrack-list").append(divIWant);


    if (target !== null && target.classList.contains('cover')) {
        if (target.classList.contains(playingCssClass)) {
            audioObject.pause();
        } else {
            if (audioObject) {
                audioObject.pause();
            }
            fetchTracks(target.getAttribute('data-album-id'), function (data) {
                audioObject = new Audio(data.tracks.items[0].preview_url);
                audioObject.play();
                target.classList.add(playingCssClass);
                audioObject.addEventListener('ended', function () {
                    target.classList.remove(playingCssClass);
                });
                audioObject.addEventListener('pause', function () {
                    target.classList.remove(playingCssClass);
                });
            });
        }
    }
});

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    searchAlbums(document.getElementById('query').value);
}, false);

// This is for adding albums to life-soundtrack list
// $(".cover").click(function(){
//   console.log("hi");
//   alert("hi");
// 		//grabbing new album results
// 		var newAlbum = $(this).val();
// 		$(this).val("");
// 		//create a new li and add to ul
// 		$("#life-soundtrack-list").append("<li> " + newAlbum + "</li>")
// 	});
});
