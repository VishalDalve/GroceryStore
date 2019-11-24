"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cron_1 = require("cron");
var MID_NIGHT = '0 0 * * *';
/**
 * @class Cron
 */
var Cron = /** @class */ (function () {
    function Cron() {
    }
    Cron.cronJob = function () {
        new cron_1.CronJob(MID_NIGHT, function () {
            console.log("Running cron");
        }, null, true);
    };
    // // init
    Cron.init = function () {
        Cron.cronJob();
    };
    return Cron;
}());
exports.default = Cron;
//# sourceMappingURL=cron.js.map