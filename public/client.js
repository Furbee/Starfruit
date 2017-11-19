// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html
var userData;

//The data type mapping the character types to the description and corresponding image.
const info_holder = [
{type: 'hipster', title: "Hipster Turnip", description: "Taylor Swift who?! Vintage and mustaches are life, and a basement brewed organic IPA is the way to accompany them. The hipster turnip likes to stream music at low bitrate to sound more like the old days. The hipster is of course a vegetable, because there is nothing original with being a fruit.", image: "srcurl"},
{type: 'singersong', title: "Singer-songwriter Orange", description: "lorem ipsum", image: "assets/ph.png"},
{type: 'party', title: "Party Pinapple", description: "Let the bass go boom and turn up the juice. Put your hands in the air and fist pump the air to pulp. The party pineapple jumps along to the beat like there is no tomorrow.", image: "imagesrc"},
{type: 'underground', title: "Underground Lemon", description: "", image: "imagesrc"},
{type: 'hiphop', title: "Hiphop Apple", description: "", image: "imagesrc"},
{type: 'metalhead', title: "Metalhead Kiwi", description: "", image: "imagesrc"}
]


$(function() {
  $('#login').click(function() {
    // Call the authorize endpoint, which will return an authorize URL, then redirect to that URL
    $.get('/authorize', function(data) {
      console.log(data)
      window.location = data;
    });
  });

  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
    window.location.hash = '';

  if (hash.access_token) {
    $.get({url: '/myendpoint', headers: {"Authorization": `Bearer ${hash.access_token}`}}, function(data) {
      // "Data" is the array of artist objects we get from the API. See server.js for the function that returns it.
      //console.log(data.body.items)

/*      var title = $('<h3>Your top artists on Spotify:</h3>');
      title.prependTo('#data-container');
*/
      //extract genres per track
      var array = [];
      data.items.forEach(function(item)
      {
        item.genres.forEach(function(genre)
        {
          array.push(genre);
        });
      });
      console.log(array);

      //count no. of unique genres present
      var map = new Map();

      array.forEach(function(item)
      {
        if(map.has(item))
        {
          map.set(item, map.get(item) + 1);
        }
        else
        {
           map.set(item, 1);
        }
       
      });
      console.log(map);

      var filter = new Map();
      var total = 0;

      const category = [
      {type: 'hipster', genres: ["alternative rock", "indie","indiecoustica", "indie rock", "indie pop", "lounge",
                   "jazz" , "blues", "folk", "folk rock", "brittish folk", "lilith", "chill out"]},
      {type: 'singersong', genres: ["sing songwriter","pop","rock","neo mellow","acoustic pop","album rock","chill out","soft rock","blues-rock","country","swedish pop"]},
      {type: 'party', genres: ["pop", "dance pop", "tropical house", "viralpop", "pop rap", "house", "teen pop", "euro pop", "trip hop", "swedish pop"]},
      {type : 'underground', genres: ["electronic", "synth pop", "trance", "house", "euro dance", "screamo", "punk", "urban contemporary", "electro house", "new rave", "disco house", "emo"]}
      ]

      //print the category dictionary
      console.log("category", category);

      //functions for getting genres and gategories
      const getGenres = (category) => category.genres
      const getCategories = (category) => category.type
      const getValues = (match) => match.value


      //example use of above functions
      const genreList = myMap(category, getGenres)
      const typeList = myMap(category, getCategories)
      console.log("genrelist", genreList)
      console.log("typelist", typeList)

      //extracting matching genres
      const match = extract(category, getGenres, getCategories)
      console.log("match", match)
      console.log("NORMALIZING COMPLETE")
      normalize(match, getValues)

      //function which can be customized with another auxilary function
      function myMap(arrayIn, fn)
      {
        const arrayOut = [];
        for(let i = 0; i < arrayIn.length; i++)
        {
          const item = arrayIn[i];
          arrayOut.push( fn(item) )
        }

        return arrayOut
      }

      //function for extracting matching genres
      function extract(arrayIn, fn_g)
      {
        var arrayOut = [];
        for(let i = 0; i < arrayIn.length; i++)
        {
          var category = arrayIn[i]
          var type = category.type
          var genres = fn_g(category)
          arrayOut.push({type: type, value: 0})
          console.log("**", type.toUpperCase(), "**")
          for(let j = 0; j < genres.length; j++)
          {
            if(map.has(genres[j]))
            {
              console.log("Genre: ", genres[j], "|| Value: ", map.get(genres[j]))
              arrayOut[i].value += map.get(genres[j])
            }
          }
          
        }
        return arrayOut
      }

      //normalizing an array of key value pairs, and return a new normalized array
      function normalize(arrayIn, fn)
      {
        var sum = 0;
        for(let i = 0; i < arrayIn.length; i++)
        {
          const item = arrayIn[i]
          sum += fn( item )
        }
        for(let j = 0; j < arrayIn.length; j++)
        {
          arrayIn[j].value /= sum
          arrayIn[j].value *= 100;
          arrayIn[j].value = Math.floor(arrayIn[j].value)
        }
      }

      /*
      // For each of the tracks, create an element (not needed)
      data.items.forEach(function(track) {
        var trackDiv = $('<li class="track"></li>');
        trackDiv.text(track.genres);
        trackDiv.appendTo('#data-container ol');
      });
      */

      // "Data" is the array of track objects we get from the API. See server.js for the function that returns it.
      console.log(data)
      var buttonSign = document.getElementById('login');
      buttonSign.style.display='none';

      var buttonFruit = document.getElementById('star-me');
      buttonFruit.style.visibility='visible';

      userData = match;
    });
  }
});


test = function() {
  console.log("test");

  //set the first to the most popular, loop through to find the most popular and return the type and value
  var most_popular = userData[0];
  var highest_value = userData[0].value;
  for(let i = 1; i < userData.length; i++)
  {
    if(userData[i].value > highest_value)
    {
      most_popular = userData[i];
      highest_value = userData[i].value;
    }
  }
  
  console.log("most popular: ",most_popular)


  var divStartpage = document.getElementById('startpage');
  divStartpage.style.display='none';


  var divResultpage = document.getElementById('resultpage');
  divResultpage.style.visibility='visible';
    /* ----------------------- */
    // hipster-stapel
  var heightH = userData[0].value;
  var heightHipster = heightH + "%";
  var topH = 100 - heightH;
  var topHipster = topH + "%";
  console.log(heightHipster);
  console.log(topHipster);
  document.getElementById("hipster").style.height = heightHipster;
  document.getElementById("hipster").style.top = topHipster;
  var createdStyleTag = document.createElement("style");
  createdStyleTag.textContent = "@keyframes graph-1{"+
  "0% { width: height: 0%; top: 100%;}"+
  "100% { height:"+ heightHipster +";}"+ "}";
  document.body.appendChild(createdStyleTag);

  // sing-stapel
  var heightS = userData[1].value;;
  var heightSinger = heightS + "%";
  var topS = 100 - heightS;
  var topSinger = topS + "%";
  console.log(heightSinger);
  console.log(topSinger);
  document.getElementById("sing").style.height = heightSinger;
  document.getElementById("sing").style.top = topSinger;
  var createdStyleTag = document.createElement("style");
  createdStyleTag.textContent = "@keyframes graph-2{"+
  "0% { width: height: 0%; top: 100%;}"+
  "100% { height:"+ heightSinger +";}"+ "}";
  document.body.appendChild(createdStyleTag);

  // paradise-stapel
  var heightPh = userData[2].value;;
  var heightParadise = heightPh + "%";
  var topPh = 100 - heightPh;
  var topParadise = topPh + "%";
  console.log(heightParadise);
  console.log(topParadise);
  document.getElementById("paradise").style.height = heightParadise;
  document.getElementById("paradise").style.top = topParadise;
  var createdStyleTag = document.createElement("style");
  createdStyleTag.textContent = "@keyframes graph-3{"+
  "0% { width: height: 0%; top: 100%;}"+
  "100% { height:"+ heightParadise +";}"+ "}";
  document.body.appendChild(createdStyleTag);

  //underground
  var heightUg = userData[3].value;;
  var heightUnder = heightUg + "%";
  var topUg = 100 - heightUg;
  var topUnder = topUg + "%";
  console.log(heightUnder);
  console.log(topUnder);
  document.getElementById("underground").style.height = heightUnder;
  document.getElementById("underground").style.top = topUnder;
  var createdStyleTag = document.createElement("style");
  createdStyleTag.textContent = "@keyframes graph-4{"+
  "0% { width: height: 0%; top: 100%;}"+
  "100% { height:"+ heightUnder +";}"+ "}";
  document.body.appendChild(createdStyleTag);

  //addict
  var heightA = 10;
  var heightAddict = heightA + "%";
  var topA = 100 - heightA;
  var topAddict = topA + "%";
  console.log(heightAddict);
  console.log(topAddict);
  document.getElementById("addict").style.height = heightAddict;
  document.getElementById("addict").style.top = topAddict;
  var createdStyleTag = document.createElement("style");
  createdStyleTag.textContent = "@keyframes graph-5{"+
  "0% { width: height: 0%; top: 100%;}"+
  "100% { height:"+ heightAddict +";}"+ "}";
  document.body.appendChild(createdStyleTag);

}
