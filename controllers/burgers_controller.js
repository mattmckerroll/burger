const express = require('express');
const { rawListeners } = require('../config/connection.js');

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require('../models/burger.js');

//create the router here and export the router
router.get('/', (req, res) => {
    burger.selectAll((data) => {
      const hbsObject = {
        burgers: data,
      };
      console.log(hbsObject);
      res.render('index', hbsObject);
    });
  });
  
  router.post("/burgers",  (req, res)=> {
      burger.insertOne(["burger_name"],[req.body.burger_name], function (){
          res.redirect("/");
      });
  });


//the put route here does work, but for some reason, i need to reload the page to see the burger move to the devoured section
  router.put("/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: 1
    }, condition, function (data) {
        res.redirect("/");
       
    });
});


module.exports = router;