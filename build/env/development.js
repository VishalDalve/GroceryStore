"use strict";
// development config
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = {
    database: {
        MONGODB_URI: 'mongodb://vd30992:vd30992@ds061797.mlab.com:61797/grocerydb'
        //MONGODB_DB_MAIN: 'grocerydb'
        // MONGODB_URI: 'mongodb://localhost:27017/',
        // MONGODB_DB_MAIN: 'hotbot_dev_db'
    },
    emailCredentials: {
        host: 'mail.vinove.com',
        port: 465,
        auth: {
            user: 'rajat.singhal@mail.vinove.com',
            pass: 'rajat@123'
        }
    },
    JWT_SECRET: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
    EMAIL_SECRET: '0E6A48F765D0FFFFF6247FA80D748E615F91DD0C7431E4D9',
    PASS_SECRET: 'b31d032cfdcf47a399990a71e43c5d2a',
    EMAIL_VERIFICATION_URL: "https://groceryappa.herokuapp.com/api/v1/auth/verify/email",
    // RESET_PASSWORD_URL:"http://localhost:3100/api/v1/auth/reset"
    RESET_PASSWORD_URL: "https://groceryappa.herokuapp.com/resetPassword"
};
//# sourceMappingURL=development.js.map