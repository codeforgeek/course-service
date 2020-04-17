const express = require('express');
const nconf = require('nconf');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const {
    createLogger,
    format,
    transports
} = require('winston');

// require bodyparser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
// set cross origin requests
app.use(cors());

// logger
app.use(morgan('tiny'));

const logger = createLogger({
    level: 'debug',
    format: format.simple(),
    transports: [new transports.Console()]
});

// load config file
nconf
    .argv()
    .env()
    .file({
        file: __dirname + '/config.json'
    });

// disable some headers
app.disable('etag');
app.disable('x-powered-by');
app.use(require('./routes/verify'));
app.use('/api', require('./routes'));

//override console log with winston
console.log = (...args) => {
    logger.info(...args);
};

// 404
app.use(function (req, res, next) {
    res.status(404).render('404');
});

// error handling routes
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Server Error');
});

// start the app
console.log(`${chalk.green('✓')} Starting the program...`);
app.listen(process.argv[2] || nconf.get('port'), () => {
    console.log(
        `${chalk.green('✓')} App is running at http://localhost:${nconf.get(
            'port'
        )}`
    );
    console.log('  Press CTRL-C to stop\n');
});

