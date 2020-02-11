var express = require("express");
const axios = require('axios');
const {URLSearchParams} = require('url');
var router = express.Router();

// An api endpoint that returns a short list of items
router.get('/', (req,res) => {
    videos = ["Video1", "Video2", "Video3", "Video4", "Video5", "Video6"];
    res.json(videos);
    //res.send(categories);
    console.log('[INFO][SERVER][API: /getVideos] Sent list of Videos: '+ videos);
});

module.exports = router;