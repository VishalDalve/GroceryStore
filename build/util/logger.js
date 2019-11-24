"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, label = winston_1.format.label, printf = winston_1.format.printf;
var t = require('winston-daily-rotate-file');
var transport = new (t)({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});
transport.on('rotate', function (oldFilename, newFilename) {
    // do something fun
});
var myFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp;
    return timestamp + "[" + level + "]- " + message;
});
var logger = winston_1.createLogger({
    format: combine(timestamp(), myFormat),
    transports: [
        transport,
        new winston_1.transports.Console(),
    ]
});
exports.default = logger;
//# sourceMappingURL=logger.js.map