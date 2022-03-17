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
    }). catch(error => {
        console.log('Error getting koalas', error);
        res.sendStatus(500);
    })

})

// POST


// PUT


// DELETE
koalaRouter.delete('/:id', (req, res) => {
    console.log('delete a koala', req.params.id);
    let id = req.params.id;
    const queryText = `
    DELETE FROM "koalas"
    WHERE "id" = $1;
    `;

    const values = [id];

    pool.query(queryText,values)
    .then(result => {
        res.sendStatus(204);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
});



module.exports = koalaRouter;