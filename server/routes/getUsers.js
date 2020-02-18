var express = require("express");
const axios = require('axios');
const {URLSearchParams} = require('url');
var router = express.Router();

// An api endpoint that returns a short list of categories
router.get('/', (req,res) => {
    var users = [ "mxs7353@g.rit.edu"];
    res.json(users);
    console.log('[INFO][SERVER][API: /getCategories] Sent list of Categories: '+ users);
});

module.exports = router;