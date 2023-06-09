const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// Fetch all exercises
router.route('/').get((req,res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add exercise
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
    .then(()=> res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Find exercise by ID
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Find exercise by ID and delete
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

// Update exercise by ID
router.route('/update/:id').post((req, res) => {
    const { username, description, duration, date } = req.body;
    Exercise.findById(req.params.id)
        .then(exercise => {
            if(username) exercise.username = req.body.username;
            if(description) exercise.description = req.body.description;
            if(duration)exercise.duration = Number(req.body.duration);
            if(date)exercise.date = Date.parse(req.body.date);
            
            exercise.save()
                .then(()=> res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;