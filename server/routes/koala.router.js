const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js')

// GET
koalaRouter.get('/', (req, res) => {
    console.log('in GET');
    let queryText = `
        SELECT * FROM "koalas"
        ORDER BY "name";
    `;

    pool.query(queryText).then(koalas => {
        res.send(koalas.rows);
    }).catch(error => {
        console.log('Error getting koalas', error);
        res.sendStatus(500);
    })

})

// POST


//PUT


koalaRouter.put('/:id', (req, res) => {
    console.log(req.params.id);
    let queryText = `
    UPDATE "koalas"
    SET "ready_to_transfer" = TRUE
    WHERE "id" = $1;
    
    `;

    const values = [req.params.id];
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

//DELETE


module.exports = koalaRouter;