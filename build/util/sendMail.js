"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
var index_1 = require("../env/index");
var Mailer = /** @class */ (function () {
    function Mailer() {
    }
    Mailer.prototype.sendMail = function (reciepent, subject, data) {
        var transporter = nodemailer.createTransport(index_1.default.envConfig.emailCredentials);
        var mailOptions;
        //Condition for superAdmin ---------   
        if (data.password) {
            mailOptions = {
                from: 'rajat.singhal@mail.vinove.com',
                to: reciepent,
                subject: subject,
                html: "<p>Hi " + data.email + ", Welcome to Hotbot.</p><p><a href=" + data.url + " target=_blank>Click here to Verify</a></p><p>Your Password : " + data.password + "</p>"
            };
        }
        else if (subject == "Reset password") {
            mailOptions = {
                from: 'rajat.singhal@mail.vinove.com',
                to: reciepent,
                subject: subject,
                html: "<p>Hi " + data.email + ", Welcome to Hotbot.</p><p><a href=" + data.url + " target=_blank>Click here to Reset password</a></p>"
            };
        }
        else {
            mailOptions = {
                from: 'rajat.singhal@mail.vinove.com',
                to: reciepent,
                subject: subject,
                html: "<p>Hi " + data.email + ", Welcome to Hotbot.</p><p><a href=" + data.url + " target=_blank>Click here to Verify</a></p>"
            };
        }
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                return 0;
            }
            else {
                console.log(info);
                return 1;
            }
        });
    };
    return Mailer;
}());
exports.default = new Mailer();
//# sourceMappingURL=sendMail.js.map