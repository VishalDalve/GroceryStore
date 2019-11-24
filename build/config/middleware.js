"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var compression = require("compression");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var helmet = require("helmet");
var Middleware = /** @class */ (function () {
    function Middleware() {
    }
    Middleware.init = function (server) {
        // express middleware
        server.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
        server.app.use(bodyParser.json({ limit: '50mb' }));
        server.app.use(bodyParser.json());
        server.app.use(cookieParser());
        server.app.use(compression());
        server.app.use(helmet());
        server.app.use(cors());
        // cors
        server.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' +
                ' Content-Type, Accept,' +
                ' Authorization,' +
                ' Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    };
    return Middleware;
}());
exports.default = Middleware;
//# sourceMappingURL=middleware.js.map