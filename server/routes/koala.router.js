const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool.js')

// DB CONNECTION


// GET


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