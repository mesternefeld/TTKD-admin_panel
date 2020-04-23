var express = require("express");
const axios = require('axios');
const {
    URLSearchParams
} = require('url');
var router = express.Router();

// An api endpoint that returns a success message that the category was successfully edited
router.post('/', (req, res) => {
    console.log('[INFO][SERVER][API: /editCategory] Edited Category Name: ', req.body.name);
    res.send('[INFO][SERVER][API: /editCategory] Edited Category Name: ', req.body.name);
});


const editCategory = async (res) => {
    let name = req.body.name;
    let id = req.body.id;
    let isCat = req.body.isCat;

    try {
        console.log('[INFO][SERVER][API: /editCategory] Editing this: '+  req.body.name +  " is Cat?: " + isCat);

        return await axios.post('https://sfjy3c2yji.execute-api.us-east-1.amazonaws.com/editCategory', {
            title: name,
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