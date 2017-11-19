// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

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

      var title = $('<h3>Your top artists on Spotify:</h3>');
      title.prependTo('#data-container');

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
      {type: 'ph', genres: ["pop", "dance pop", "tropical house", "viralpop", "pop rap", "house", "teen pop", "euro pop", "trip hop", "swedish pop"]},
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
        }
      }
      // For each of the tracks, create an element (not needed)
      data.items.forEach(function(track) {
        var trackDiv = $('<li class="track"></li>');
        trackDiv.text(track.genres);
        trackDiv.appendTo('#data-container ol');
      });


    });
  }

});
