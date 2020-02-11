//https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3
var createError = require('http-errors');
var express = require('express');
var path = require('path');

var getCategories = require('./routes/getCategories');
var getVideos = require('./routes/getVideos');
var addVideo = require('./routes/addVideo');
var addAudio = require('./routes/addAudio');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));


app.use("/getCategories?", getCategories);
app.use("/getVideos?", getVideos);
app.use("/addVideo?", addVideo);
app.use("/addAudio?", addAudio);


// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items: '+ list);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});



const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
module.exports = app;