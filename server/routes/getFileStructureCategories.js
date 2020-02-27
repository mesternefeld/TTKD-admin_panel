var express = require("express");
const axios = require('axios');
const {URLSearchParams} = require('url');
var router = express.Router();

// const categories = [
//     {
//         "id": 1,
//         "name": "Stances",
//         "reportsTo": 1
//     },
//     {
//         "id": 6,
//         "name": "Stance 1",
//         "reportsTo": 1
//     },
//     {
//         "id": 2,
//         "name": "Blocks",
//         "reportsTo": 2
//     },
//     {
//         "id": 7,
//         "name": "Block 1",
//         "reportsTo": 2
//     },
//     {
//         "id": 8,
//         "name": "One Step 1",
//         "reportsTo": 4
//     },
//     {
//         "id": 4,
//         "name": "One Step",
//         "reportsTo": 4
//     },
//     {
//         "id": 5,
//         "name": "Forms",
//         "reportsTo": 5,
//     },
//     {
//         "id": 9,
//         "name": "Form 1",
//         "reportsTo": 5,
//     },
//     {
//         "id": 10,
//         "name": "Form 1 Part A",
//         "reportsTo": 9
//     }
// ];

const categories = [
    {
        "id": 1,
        "name": "Stances",
        "category": [
            {
                "id": 6,
                "name": "Stance 1",
                "reportsTo": 1
            },
        ]
    },
    {
        "id": 2,
        "name": "Blocks",
        "category": [
            {
                "id": 7,
                "name": "Block 1",
                "reportsTo": 2
            },
        ]
    },
    {
        "id": 4,
        "name": "One Step",
        "category": [
            {
                "id": 8,
                "name": "One Step 1",
                "reportsTo": 4
            },
        ]
    },
    {
        "id": 5,
        "name": "Forms",
        "category": [
            {
                "id": 9,
                "name": "Form 1",
                "reportsTo": 5,
                "category": [
                    {
                        "id": 10,
                        "name": "Form 1 Part A",
                        "reportsTo": 9
                    }
                ]
            },
        ]
    }
];

// An api endpoint that returns a list of categories
router.get('/', (req,res) => {
    res.json(categories);
    console.log('[INFO][SERVER][API: /getFileStructureCategories] Sent list of Categories: '+ categories);
});

module.exports = router;