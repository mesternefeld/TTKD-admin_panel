var express = require("express");
const axios = require('axios');
const {URLSearchParams} = require('url');
const {OAuth2Client} = require('google-auth-library');
var router = express.Router();

var username_list = ["mxs7353@g.rit.edu", "rissity@gmail.com"];

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
    console.log("resquest body");
    console.log(req.body);

    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body["id_token"],
            audience: CLIENT_ID,
        });
        console.log("in verify");
        const payload = ticket.getPayload();
        console.log(payload);
        return payload;
        
    }
    var payload = await verify().catch(function (error) {
        console.log(error);
    });
    console.log("after verify");
    console.log(payload);

    if(!payload){
        return res.status(401).send('This user session has expired.');
    }
    var checked = checkUsername(payload["email"]);
    console.log("HERE");
    if(checked){
        console.log("ischcked");
        res.status(200).send("Email Valid");
    }else{
        console.log("nope");
        return res.status(401).send('This user does not have permission to login.');
    }
    //var payload = verify().catch();
    //console.log("HERE");
    
    //console.log('[INFO][SERVER][API: /checkToken] Checking Token: ');
});

module.exports = router;