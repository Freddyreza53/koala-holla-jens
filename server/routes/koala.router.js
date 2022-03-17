const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool.js')

// DB CONNECTION


// GET


// POST
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body
    console.log('Adding', newKoala);
    newKoala.age = Number(newKoala.age);

    // convert readyForTransfer to ready_to_transfer
    if(newKoala.ready_to_transfer.toLowerCase() === 'yes') {
        newKoala.ready_to_transfer = true;
      } else if(newKoala.ready_to_transfer.toLowerCase() === 'no') {
        newKoala.ready_to_transfer = false;
      } else {
        alert('Please say yes or no for ready to transfer <3')
      }

    let queryText = `
    INSERT INTO "koalas"
    ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES ($1, $2, $3, $4, $5);
    `;

    let values = [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_transfer, newKoala.notes]
    
    pool.query(queryText, values)
    .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new koala`, error);
        res.sendStatus(500);
      });
})


// PUT


// DELETE

module.exports = koalaRouter;