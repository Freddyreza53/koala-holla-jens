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