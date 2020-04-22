var express = require("express");
const axios = require('axios');
const {
    URLSearchParams
} = require('url');
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

const categoriez = [{
        id: 1,
        name: "Stances",
        parentID: 1,
        category: [{
            id: 6,
            name: "Stance 1",
            parentID: 1
        }, ]
    },
    {
        id: 2,
        name: "Blocks",
        parentID: 2,
        category: [{
            id: 6,
            name: "Stance 1",
            parentID: 1
        }, ]
    },
    {
        id: 3,
        name: "One-steps",
        parentID: 3,
        category: [ ]
    },
    {
        id: 5,
        name: "Forms",
        parentID: 5,
        category: [{
            id: 9,
            name: "Form 1",
            parentID: 5,
            category: [{
                id: 10,
                name: "Form_1_Part_A.jpg",
                parentID: 9,
                isVideo: true
            }]
        }, ]
    }
];

aws = [{
        id: 1,
        parentID: 1,
        name: 'Basic Stuff',
        studio: 'ttkd',
        category: []
    },
    {
        id: 2,
        parentID: 2,
        name: 'Stances',
        studio: 'ttkd',
        category: []
    },
    {
        id: 3,
        parentID: 3,
        name: 'Blocks',
        studio: 'ttkd',
        category: []
    },
    {
        id: 4,
        parentID: 4,
        name: 'One-Steps',
        studio: 'ttkd',
        category: []
    },
    {
        id: 5,
        parentID: 5,
        name: 'Forms',
        studio: 'ttkd',
        category: []
    },
    {
        id: 6,
        parentID: 1,
        name: 'Set Up Information',
        studio: 'ttkd',
        category: []
    },
    {
        id: 7,
        parentID: 2,
        name: 'Basic Stance Information',
        studio: 'ttkd',
        category: []
    }
]

// An api endpoint that returns a list of categories
router.get('/', (req, res) => {
    //res.json(categories);
    awsCategories = getCategories(res);

    //console.log(res.json(aws));
    //res.json(aws, awsCategories);
    res.send({
        //data: categoriez
        data: realCategories
    });
});

const getCategories = async (res) => {
    try {
        awsCategories = await axios.get('https://sfjy3c2yji.execute-api.us-east-1.amazonaws.com/TestDBFetchall')
        console.log('[INFO][SERVER][API: /getFileStructureCategories] Sent list of Categories: ');
        console.dir("poop:")
        console.dir(awsCategories.data.categories);

        realCategories = [];

        awscat = awsCategories.data.categories;
        awsContent = awsCategories.data.content;
        for (var i = 0; i < awscat.length; i++) {
            var id = awscat[i].id;
            var name = awscat[i].title;
            var parentID = awscat[i].parent_id;

            if (parentID == null) {
                parentID = id;
            }

            if (parentID != id) {
                console.log("this is my parent id muhhahaha: ", realCategories[parentID - 1]);
                if (realCategories[parentID - 1].id === parentID) {
                    pushCategory = [{
                        id: id,
                        name: name,
                        parentID: parentID
                    }]
                    console.log("pushing this category so help me god: ", pushCategory);
                    realCategories[parentID - 1]["category"] = pushCategory;
                    console.log(realCategories[0].category);
                }

            }
            //console.log("this is my parent id muhhahaha: ", realCategories[0] );

            //doesn't already exist in the json
            else{
                realCategories.push({
                    id: id,
                    name: name,
                    parentID: parentID,
                    category: []
                });

            }

            //console.log("this is my parent id muhhahaha: ", realCategories[0] );

            console.log(id, name, parentID);
        }

        for (var k = 0; k < awsContent.length; k++) {
            addingVideo = realCategories;
            var id = awsContent[k].id;
            var name = awsContent[k].title;
            var parentID = awsContent[k].category_id;

            if (parentID != id) {
                console.log("this is my parent id muhhahaha: ") 
                console.log(addingVideo[parentID - 1]);
                console.log("  ");


                if (addingVideo[parentID - 1].id === parentID) {
                    pushCategory = {
                        id: id,
                        name: name + " (Video)",
                        parentID: parentID
                    }
                    console.log("  ");
                    console.log("pushing this video so help me god: ", pushCategory);
                    console.log("  ");
                    addingVideo[parentID - 1]["category"].push(pushCategory);

                }

            }

        }


        console.log(realCategories[0]);
        console.log(categoriez[0]);
        console.log(typeof realCategories[0]);
        console.log(typeof categoriez[0]);
        console.log([realCategories]);
        return realCategories;
    } catch (error) {
        console.error(error)
        return error;
    }
}

module.exports = router;