var express = require("express");
const axios = require('axios');
const {URLSearchParams} = require('url');
const {OAuth2Client} = require('google-auth-library');
var router = express.Router();

var username_list = ["mxs7353@g.rit.edu"];

function checkUsername(username){
    if(username_list.includes(username)){
        return true;
    }else{
        return false;
    }
}

router.post('/', async (req, res, next) => {
    //res.json(videos);
    //res.send(categories);
    var CLIENT_ID = "402862016858-3316mp00ucrloj1fih46qmf1dgf6cdh8.apps.googleusercontent.com";

    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body["id_token"],
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;
    }
    var payload = await verify().catch(function (error) {
        console.log(error);
    });

    if(!payload){
        return res.status(401).send('This user session has expired.');
    }
    var checked = checkUsername(payload["email"]);
    if(checked){
        res.status(200).send("Email Valid");
    }else{
        return res.status(401).send('This user does not have permission to login.');
    }
    
    console.log('[INFO][SERVER][API: /checkToken] Checking Token: ');
});

module.exports = router;