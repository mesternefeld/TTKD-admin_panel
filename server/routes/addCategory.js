var express = require("express");
const axios = require('axios');
const {URLSearchParams} = require('url');
var router = express.Router();

// An api endpoint that returns a success message that the category was successfully added
router.post('/', function (req, res) {
    console.log("Received Category to be Added From Frontend: ", req.body.category);
    res.send(req.body.category + '  Successfully Added!')
  });

module.exports = router;