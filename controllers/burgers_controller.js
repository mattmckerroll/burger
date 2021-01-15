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

  router.put("/burgers/:id", (req,res) => {
      const condition  = `id = ${req.params.id}`;

      burger.updateOne(
          {
              devoured: req.body.devoured,
          },
          condition,
          (result) => {
            if (result.changedRows === 0) {
              // If no rows were changed, then the ID must not exist, so 404
              return res.status(404).end();
            }
            res.status(200).end();
          }
      )
  })

module.exports = router;