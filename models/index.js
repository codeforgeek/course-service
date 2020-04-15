const mongo = require('mongodb');
const nconf = require('nconf');
const chalk = require('chalk');

// connect to MongoDB
var dbo = null;
mongo.connect(nconf.get('mongodbURL'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, db) => {
    if (err) {
        console.log(chalk.red(err));
        process.exit(0);
    }
    dbo = db.db('codeforgeek');
    console.log(`${chalk.green('✓')} Connected to ${chalk.green('MongoDB')} database`);
});

/**
 * @getAllCourses
 */

function getAllCourses(callback) {
    try {
        dbo.collection('courses').find({}).sort({
            date: -1
        }).toArray((err, results) => {
            if (err) {
                return callback(true, 'error retrieving course.');
            }
            let response = {
                courses: results,
            };
            callback(false, response);
        });
    }
    catch(e) {
        callback(true, 'Error occurred getting courses');
    }
}

function getAllLessons(query, callback) {
    let courseId = parseInt(query.courseId);
    dbo.collection('lessons').find({
        courseId: courseId,
    }).toArray((err, lessonData) => {
        if (err) {
            return callback(true, 'error retrieving lesson.');
        }
        if (lessonData.length === 0) {
            return callback(false, []);
        }
        callback(false, lessonData);
    });
}

function getSpecifcLesson(query, callback) {
    dbo.collection('lessons').find({
        courseId: query.courseId,
        lessonId: query.lessonId
    }).toArray((err, lessonData) => {
        if (err) {
            return callback(true, 'error retrieving lesson.');
        }
        if (lessonData.length === 0) {
            return callback(false, []);
        }
        callback(false, lessonData);
    });
}

function createCourse(courseData, callback) {
    let payload = {
        "id": Math.floor((Math.random() * 100000000000) + 2),
        "name": courseData.name,
        "slug": courseData.slug,
        "featuredImage": courseData.featuredImage,
        "price": courseData.price,
        "author": 1,
        "date": new Date(),
        "overview": courseData.overview,
        "url": nconf.get('url') + courseData.slug,
        "isPublished": false
    };

    dbo.collection('courses').insertOne(payload, (err, results) => {
        if(err) {
            return callback(true, 'error creating courses.');
        }
        callback(false, {error: false, message: "Successfully created the course", data: results.ops[0]});
    });
}

function updateCourse(courseData, callback) {
    let payload = {
        "id": parseInt(courseData.id),
        "name": courseData.name,
        "slug": courseData.slug,
        "featuredImage": courseData.featuredImage,
        "price": courseData.price,
        "author": 1,
        "date": new Date(),
        "overview": courseData.overview,
        "url": nconf.get('url') + courseData.slug,
        "isPublished": courseData.isPublished
    };

    dbo.collection('courses').updateOne({id: parseInt(courseData.id)}, {$set: payload}, (err, results) => {
        if(err) {
            return callback(true, 'error updating courses.');
        }
        callback(false, {error: false, message: "Successfully updated the course", data: []});
    });
}

function deleteCourse(courseData, callback) {
    dbo.collection('courses').deleteOne({id: parseInt(courseData.id)}, (err, results) => {
        if(err) {
            return callback(true, 'error deleting course.');
        }
        dbo.collection('lessons').deleteOne({courseId: parseInt(courseData.id)}, (err, results) => {
            if(err) {
                return callback(true, 'error deleting lessons.');
            }
        });
        callback(false, {error: false, message: "Successfully deleted the course", data: []});
    });
}

function createLesson(lessonData, callback) {
    let payload = {
        "id": Math.floor((Math.random() * 100000000000) + 2),
        "title": lessonData.title,
        "slug": lessonData.slug,
        "excerpt": lessonData.excerpt,
        "content": lessonData.content,
        "courseId": parseInt(lessonData.courseId),
        "lessonOrder": lessonData.lessonOrder,
        "url": nconf.get('url') + lessonData.slug,
        "isPublished": false
    };

    dbo.collection('lessons').insertOne(payload, (err, results) => {
        if(err) {
            return callback(true, 'error creating courses.');
        }
        callback(false, {error: false, message: "Successfully created the lesson.", data: results.ops[0]});
    });
}

function updateLesson(lessonData, callback) {
    let payload = {
        "id": parseInt(lessonData.id),
        "title": lessonData.title,
        "slug": lessonData.slug,
        "excerpt": lessonData.excerpt,
        "content": lessonData.content,
        "courseId": parseInt(lessonData.courseId),
        "lessonOrder": lessonData.lessonOrder,
        "url": nconf.get('url') + '/lessons/#/' + lessonData.slug,
        "isPublished": lessonData.isPublished
    };

    dbo.collection('lessons').updateOne({id: parseInt(lessonData.id), courseId: parseInt(lessonData.courseId)}, {$set: payload}, (err, results) => {
        if(err) {
            return callback(true, 'error updating lessons.');
        }
        console.log(results);
        callback(false, {error: false, message: "Successfully updated the lessons.", data: []});
    });
}

function deleteLesson(lessonData, callback) {
    dbo.collection('lessons').remove({id: parseInt(lessonData.id), courseId: parseInt(lessonData.courseId)}, (err, results) => {
        if(err) {
            return callback(true, 'error deleting lessons.');
        }
        callback(false, {error: false, message: "Successfully deleted the lessons.", data: []});
    });
}

module.exports = {
    getAllCourses: getAllCourses,
    getAllLessons: getAllLessons,
    createCourse: createCourse,
    createLesson: createLesson,
    updateCourse: updateCourse,
    deleteCourse: deleteCourse,
    updateLesson: updateLesson,
    deleteLesson: deleteLesson,
    getSpecifcLesson: getSpecifcLesson,
};