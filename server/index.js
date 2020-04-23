//https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require("cors");

var getCategories = require('./routes/getCategories');
var getVideos = require('./routes/getVideos');
var addVideo = require('./routes/addVideo');
var addAudio = require('./routes/addAudio');
var addCategory = require('./routes/addCategory');
var editCategory = require('./routes/editCategory');
var removeCategory = require('./routes/removeCategory');
var getFileStructureCategories = require('./routes/getFileStructureCategories');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Serve the static files from the React app
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//add cors
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use("/getCategories?", getCategories);
app.use("/getVideos?", getVideos);
app.use("/addVideo?", addVideo);
app.use("/addAudio?", addAudio);
app.use("/addCategory?", addCategory);
app.use("/editCategory?", editCategory);
app.use("/removeCategory?", removeCategory);
app.use("/getFileStructureCategories?", getFileStructureCategories);


// An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items: '+ list);
// });


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