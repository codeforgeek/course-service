const mongo = require('mongodb');
const chalk = require('chalk');


// connect to MongoDB
var dbo = null;
mongo.connect('mongodb://localhost:27017', {
    useNewUrlParser: true
}, (err, db) => {
    if (err) {
        console.log(chalk.red(err));
        process.exit(0);
    }
    dbo = db.db('codeforgeek');
    console.log(`${chalk.green('✓')} Connected to ${chalk.green('MongoDB')} database`);
});

function updateId() {
    dbo.collection('lessons').find({
    }).toArray((err, lessonData) => {
        if (err) {
            return callback(true, 'error retrieving lesson.');
        }
        if (lessonData.length === 0) {
            return callback(false, []);
        }
        lessonData.forEach((singleLesson) => {
            singleLesson.id =  Math.floor((Math.random() * 100) + 2);
            dbo.collection('lessons').update({slug: singleLesson.slug}, {$set: singleLesson}, (err, result) => {
                if(err) {
                    console.log(err);
                }
                console.log(result);
            });
        });
    });
}

setTimeout(() => {
    updateId();
}, 2000);
