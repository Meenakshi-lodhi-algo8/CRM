const {format, createLogger, transports} = require('winston');
const {timestamp, combine, printf} = format;

const myformat = printf(({level, message, timestamp, stack}) => {
    return `${timestamp} ${level}: ${stack || message}`;
});
const logger = createLogger({
    format: combine(
        format.colorize(),
        timestamp(), 
        format.errors({stack: true}),
        myformat),
    transports: [
        new transports.File({
            filename: './logs.log'
        })
    ],
});

module.exports = logger;