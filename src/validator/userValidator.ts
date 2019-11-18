const Joi = require('joi');


class Validator {

    CreateUserSchema = Joi.object().keys({

        // name is required
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        role : Joi.string(),
        contact: Joi.string(),
        address: Joi.string()
        
    });
   
}

export default new Validator();