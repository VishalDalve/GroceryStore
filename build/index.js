"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var http = require("http");
var server_1 = require("./server");
var serverHandlers = require("./serverHandlers");
var logger_1 = require("./util/logger");
debug('ts-express:server');
var port = serverHandlers.normalizePort(process.env.PORT || 3100);
server_1.default.set('port', port);
logger_1.default.log('info', "Server listening on port " + port);
var server = http.createServer(server_1.default);
// server listen
server.listen(port);
// server handlers
server.on('error', function (error) { return serverHandlers.onError(error, port); });
server.on('listening', serverHandlers.onListening.bind(server));
//# sourceMappingURL=index.js.map