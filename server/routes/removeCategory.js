var express = require("express");
const axios = require('axios');
const {URLSearchParams} = require('url');
var router = express.Router();

// An api endpoint that returns a success message that the category was successfully removed
router.post('/', (req,res) => {
    console.log('[INFO][SERVER][API: /removeCategory] Removed Category: ', req.body.category);
});

module.exports = router;