var express = require("express");
const axios = require('axios');
const {URLSearchParams} = require('url');
const {OAuth2Client} = require('google-auth-library');
var router = express.Router();

router.post('/', (req, res, next) => {
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
        console.log(ticket);
        const payload = ticket.getPayload();
        console.log(payload);
    }
    var payload = verify().catch(console.error);
    console.log(payload);
    res.send({ status: 'SUCCESS' });
    console.log('[INFO][SERVER][API: /checkToken] Checking Token: ');
});

module.exports = router;