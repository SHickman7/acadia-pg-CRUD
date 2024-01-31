const express = require('express');
const router = express.Router();
const pg = require('pg');  // Import pg, which is what we need

// Boilerplate Code!!!!
const pool = new pg.Pool({
    // The name of your database. ⭐ This will change for every app!
    database: 'songs',
    // Where is your database? localhost === On your computer
    host: 'localhost',
    // Postgres listens for network connections on port 5432, by default
    port: 5432,
});


// We will switch from using this Array to using a database.


router.get('/', (req, res) => {

    // get songs from the data base
    // you write a query, as a string
    let queryText = `SELECT * FROM "songs";`;

    // you send that query to the database
    pool.query(queryText)
        .then(
            (result) => {  // <- You do stuff to the results, with a callback

                // console.log(result); // <- this is the full result from the database
                // like always, the stuff we want is in some sort of envelope

                // console.log(result.rows); // <- this is the data we want

                // Sometimes it's nice to unpack the data, before you send it off.
                // Especially, if you need to do stuff to it first.
                let songs = result.rows;

                // send them back to the client
                res.send(songs);
            }
        )
        .catch(
            (err) => {
                console.log(`Error making query ${queryText}`, err);
                res.sendStatus(500);
            }
        );


});

router.post('/', (req, res) => {

    // I know that req.body looks like: 
    // {
    //     artist: ,
    //     track: ,
    //     rank: ,
    //     published: ,
    // }

    console.log(req.body);
    let newSong = req.body;

    // // This is how to do this UNSAFELY, don't EVER do it this way!
    // let queryText = `
    //     INSERT INTO "songs" ("rank", "track", "artist", "published") 
    //     VALUES
    //     (${newSong.rank}, '${newSong.track}', '${newSong.artist}', '${newSong.published}') 
    //     ;`;

    //     pool.query(queryText)
    //     .then(
    //         (result) => {
    //             console.log(`this post query worked, ${queryText}`, result);
    //             res.sendStatus(201);
    //         }
    //     )
    //     .catch(
    //         (error) => {
    //             console.log(`this post query failed, ${queryText}`, error);
    //             res.sendStatus(500);
    //         }
    //     );


    // This is how to do this safely sanitize your inputs, always do it this way.
    let queryText = `
        INSERT INTO "songs" ("rank", "track", "artist", "published") 
        VALUES
        ($1, $2, $3, $4) 
        ;`;
    // ^ We replace the 'javascript template placeholders' with 'pg template placeholders'

    // 👇 We pass our query to the pool, along with a new second parameter.
    // The second parameter is the list of things we want pg to safely put into the template
    // Warning, you may want/have to double check if things are a date/number/string etc...
    pool.query(queryText, [newSong.rank, newSong.track, newSong.artist, newSong.published])
        .then(
            (result) => {
                console.log(`this post query worked, ${queryText}`, result);
                res.sendStatus(201);
            }
        )
        .catch(
            (error) => {
                console.log(`this post query failed, ${queryText}`, error);
                res.sendStatus(500);
            }
        );

});

router.delete('/:id', (req, res) => {
    // NOTE: This route is incomplete, we'll use it tomorrow
    console.log('req.params', req.params);

    let id = req.params.id;

    let queryText = `DELETE FROM "songs" WHERE "id" = $1`;

    pool.query(queryText, [id])
        .then(
            (result) => {
                console.log(`DELETE query worked! ${queryText}`, result);
                res.sendStatus(204);
            }
        )
        .catch(
            (error) => {
                console.log(`DELETE query failed, ${queryText}`, error);
                res.sendStatus(500);
            }
        );
});

router.put('/rank/:id', (req, res) => {

    console.log('in the put on the server');
    let songID = req.params.id

    let direction = req.body.direction;

    console.log(direction);
    let sqlText = '';

    if (direction === 'up') {
        sqlText = `UPDATE songs SET rank=rank+1 WHERE id=$1`;
    }
    else if (direction === 'down') {
        sqlText = `UPDATE songs SET rank=rank-1 WHERE id=$1`;
    } else {
        res.sendStatus(400);
    }



    pool.query(sqlText, [songID])
        .then((result) => {
            console.log(`PUT query worked! ${sqlText}`, result);
            res.sendStatus(201)
        })
        .catch(
            (error) => {
                console.log(`PUT query failed, ${sqlText}`, error);
                res.sendStatus(500);
            }
        )
})

module.exports = router;
