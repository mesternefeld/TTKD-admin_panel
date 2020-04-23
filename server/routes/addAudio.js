var express = require("express");
const axios = require('axios');
const {URLSearchParams} = require('url');
var router = express.Router();

// An api endpoint that returns a short list of items
router.post('/', (req,res) => {
    //res.json(videos);
    //res.send(categories);
    console.log('[INFO][SERVER][API: /addAudio] Paired Audio with Video: ');
});

module.exports = router;