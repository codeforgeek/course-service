const mongo = require('mongodb');
const nconf = require('nconf');
const chalk = require('chalk');
const redisClient = require('redis').createClient;
const redis = redisClient(6379, 'localhost');

// connect to MongoDB
var dbo = null;
mongo.connect(nconf.get('mongodbURL'), {
    useNewUrlParser: true
}, (err, db) => {
    if (err) {
        console.log(chalk.red(err));
        process.exit(0);
    }
    dbo = db.db('codeforgeek');
    console.log(`${chalk.green('✓')} Connected to ${chalk.green('MongoDB')} database`);
});

// check Redis connection
redis.on("connect", () => {
    console.log(`${chalk.green('✓')} Connected to ${chalk.green('Redis')} database`);
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
    // cache does not exists, get it from MongoDB
    let courseId = query.courseId;
    dbo.collection('lessons').find({
        courseId: parseInt(courseId),
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
        "id": courseData.update ? courseData.id : Math.floor((Math.random() * 100000000000) + 2),
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

    if(courseData.update)  {
        dbo.collection('courses').update({id: courseData.id}, {$set: payload}, (err, results) => {
            if(err) {
                return callback(true, 'error updating courses.');
            }
            console.log(results);
            callback(false, results);
        });
    } else {
        dbo.collection('courses').insertOne(payload, (err, results) => {
            if(err) {
                return callback(true, 'error creating courses.');
            }
            console.log(results);
            callback(false, results);
        });
    }
}

function createLesson(lessonData, callback) {
    let payload = {
        "id": lessonData.update ? lessonData.id : Math.floor((Math.random() * 100000000000) + 2),
        "title": lessonData.title,
        "slug": lessonData.slug,
        "excerpt": lessonData.excerpt,
        "content": lessonData.content,
        "courseId": lessonData.courseId,
        "lessonOrder": lessonData.lessonOrder,
        "url": nconf.get('url') + courseData.slug,
        "isPublished": false
    };

    if(lessonData.update)  {
        dbo.collection('lessons').update({id: lessonData.id}, {$set: payload}, (err, results) => {
            if(err) {
                return callback(true, 'error updating courses.');
            }
            console.log(results);
            callback(false, results);
        });
    } else {
        dbo.collection('lessons').insertOne(payload, (err, results) => {
            if(err) {
                return callback(true, 'error creating courses.');
            }
            console.log(results);
            callback(false, results);
        });
    }
}

module.exports = {
    getAllCourses: getAllCourses,
    getAllLessons: getAllLessons,
    createCourse: createCourse,
    createLesson: createLesson,
};