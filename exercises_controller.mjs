import * as exercises from './exercises_model.mjs';
import express from 'express';
const app = express();
const PORT = 3000;

// Express.json middleware required for a REST API
app.use(express.json());

/**
 * Create a new exercise with the name, weight, unit, and date
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            // res.status returns the response object; we can chain calls and set Content-Type to JSON using one statement
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 500 in case of an error.
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve all the exercises in the collection.
 */
app.get('/exercises', (req, res) => {
    exercises.retrieveExercises()
        .then(exercise => {
            res.status(200).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Update the exercise whose id is provided in the path parameter.
 */
app.put('/exercises/:_id', (req, res) => {
    // Initialize condition parameter/user object to be modified
    let condition = {"_id": req.params._id};  // specify id of the document to be updated
    let update = {};  // add properties to be updated
    if (req.body.name !== undefined) {
        update.name = req.body.name
    }
    if (req.body.reps !== undefined) {
        update.reps = req.body.reps
    }
    if (req.body.weight !== undefined) {
        update.weight = req.body.weight
    }
    if (req.body.unit !== undefined) {
        update.unit = req.body.unit
    }
    if (req.body.date !== undefined) {
        update.date = req.body.date
    }
    // Call update CRUD function in model layer
    exercises.updateExercise( condition, update )
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight,
                                unit: req.body.unit, date: req.body.date})
            } else {
                res.status(500).json({Error: 'Resource not found'});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the exercise whose id is provided in the route parameter
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExercise( req.params._id )
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(500).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
