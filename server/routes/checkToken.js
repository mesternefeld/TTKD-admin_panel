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
    console.log(req.body);
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body["id_token"],
            audience: CLIENT_ID,
        });
        //console.log(ticket);
        const payload = ticket.getPayload();
        console.log(payload);
        return payload;
        
    }
    var payload = await verify().catch(function (error) {
        console.log(error);
    });

    if(!payload){
        return res.send({login: false});
    }
    var checked = checkUsername(payload["email"]);
    if(checked){
        return res.send({login: true});
    }else{
        return res.send({login: false});
    }
    //var payload = verify().catch();
    //console.log("HERE");
    
    //console.log('[INFO][SERVER][API: /checkToken] Checking Token: ');
});

module.exports = router;