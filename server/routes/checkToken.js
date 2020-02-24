var express = require("express");
const axios = require('axios');
const {URLSearchParams} = require('url');
const {OAuth2Client} = require('google-auth-library');
var router = express.Router();

router.post('/', (req, res, next) => {
    //res.json(videos);
    //res.send(categories);
    console.log(req.body);
    //console.log(res);
    /*const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    }*/
    //verify().catch(console.error);
    res.send({ status: 'SUCCESS' });
    console.log('[INFO][SERVER][API: /checkToken] Checking Token: ');
});

module.exports = router;