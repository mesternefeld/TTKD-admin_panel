var express = require("express");
const axios = require('axios');
const {URLSearchParams} = require('url');
var router = express.Router();

// An api endpoint that returns a success message that the category was successfully edited
router.post('/', (req,res) => {
    //res.json(videos);
    //res.send(categories);
    console.log('[INFO][SERVER][API: /editCategory] Edited Category Name: ',req.body.category);
    res.send(req.body.category + '  Successfully Edited!')
});

module.exports = router;