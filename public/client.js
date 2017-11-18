// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html
var userData;


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
      // "Data" is the array of track objects we get from the API. See server.js for the function that returns it.
      console.log(data)
      var buttonSign = document.getElementById('login');
      buttonSign.style.display='none';

      var buttonFruit = document.getElementById('star-me');
      buttonFruit.style.visibility='visible';

      userData = data;
    });
  }
});

test = function() {
  console.log("test");

  var divStartpage = document.getElementById('startpage');
  divStartpage.style.display='none';


  var divResultpage = document.getElementById('resultpage');
  divResultpage.style.visibility='visible';
    /* ----------------------- */
  var heightH = 20;
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
  var heightS = 20;
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
  var heightPh = 100;
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
  var heightUg = 40;
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
  var heightA = 70;
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
