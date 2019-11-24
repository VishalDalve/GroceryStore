"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD_PATH = 'uploads';
var multer = require("multer");
var path = require("path");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, exports.UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, exports.UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, req.loggedInUser._id + path.extname(file.originalname));
    }
});
exports.upload = multer({ storage: storage });
exports.productUpload = multer({ storage: profileStorage });
//# sourceMappingURL=fileUpload.js.map