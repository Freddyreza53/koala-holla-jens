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


//PUT


koalaRouter.put('/:id', (req, res) => {
    console.log(req.params.id);
    
    
    
    res.sendStatus(200);
    
})
//DELETE


module.exports = koalaRouter;