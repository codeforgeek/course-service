const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/courses', (req,res) => {
    models.getAllCourses(
        (err, results) => {
            if (err) {
                return next();
            }
            if (results.length === 0) {
                return next();
            }
            res.send(results);
        }
    );
});

router.post('/courses',(req,res) => {
    let data = req.body;
    models.createCourse(data,(err, results) => {
        if (err) {
            return next();
        }
        res.send(results); 
    });
});

router.get('/courses/:courseId/lessons', (req,res) => {
    models.getAllLessons({
            courseId: req.params.courseId,
        },
        (err, results) => {
            if (err) {
                return res.status(404).send();
            }
            res.send(results);
        }
    );
});


router.post('/courses/:courseId/lessons', (req,res) => {
    let data = req.body;
    models.createLesson(data,
        (err, results) => {
            if (err) {
                return res.status(404).send();
            }
            res.send(results);
        }
    );
});

module.exports = router;