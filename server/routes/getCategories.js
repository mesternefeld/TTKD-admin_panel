var express = require("express");
const axios = require('axios');
const {URLSearchParams} = require('url');
var router = express.Router();

// An api endpoint that returns a short list of items
router.get('/', (req,res) => {
    var categories = [ "Stances", "Blocks", "One-Steps", "Forms"];
    res.json(categories);
    console.log('[INFO][SERVER][API: /getCategories] Sent list of Categories: '+ categories);
});

module.exports = router;