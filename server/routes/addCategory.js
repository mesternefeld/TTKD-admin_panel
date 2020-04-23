var express = require("express");
const axios = require('axios');
const {
  URLSearchParams
} = require('url');
var router = express.Router();

// An api endpoint that returns a success message that the category was successfully added
router.post('/', function (req, res) {
  console.log("Received Category to be Added From Frontend: ", req.body.name);

  const addCat = addCategory(req);
  res.send(req.body.name + '  Successfully Added! ');
});

const addCategory = async (res) => {
  let name = req.body.name;
  let parentID = req.body.parentID;

  console.log("Trying to add category!! => name: " + name + " parentID: " + parentID);

  try {
    console.log('[INFO][SERVER][API: /addCategory] Adding this category: ');

    return await axios.post('https://sfjy3c2yji.execute-api.us-east-1.amazonaws.com/addCategory', {
      name: name,
      parentID: parentID

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