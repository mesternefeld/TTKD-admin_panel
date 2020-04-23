var express = require("express");
const axios = require('axios');
const {
    URLSearchParams
} = require('url');
var router = express.Router();

// An api endpoint that returns a success message that the category was successfully removed
router.post('/', (req, res) => {
    console.log('[INFO][SERVER][API: /removeCategory] Removed Category: ', req.body.id);


    const removed = removeCategory(req);
    res.send('[INFO][SERVER][API: /removeCategory] Removed Category: ', removed);
});


const removeCategory = async (req) => {
    let id = req.body.id;
    let isCat = req.body.isCat;

    try {
        console.log('[INFO][SERVER][API: /removeCategory] Removing this : ' + id +  " is Cat?: " + isCat);

        return await axios.post('https://sfjy3c2yji.execute-api.us-east-1.amazonaws.com/removeCategory', {
            id: id,
            isCat: isCat

        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        console.error(error)
        return error;
    }
}

module.exports = router;