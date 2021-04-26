const Joi = require('joi');

const initiateValidate = () => {
    return Joi.object().keys({
        id_client: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id_client deve ser um inteiro!',
            'number.min': 'Id_client não pode ser menor que 1!',
            'number.empty': 'Id_client não pode ser vazio!',
            'any.required': 'Id_client é obrigatório!'
        }),
        id_salesman: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id_salesman deve ser um inteiro!',
            'number.min': 'Id_salesman não pode ser menor que 1!',
            'number.empty': 'Id_salesman não pode ser vazio!',
            'any.required': 'Id_salesman é obrigatório!'
        }),
    });
}

const messageValidate = () => {
    return Joi.object().keys({
        id_room: Joi.string().min(1).max(60).required().messages({
            'string.empty': 'Sala não pode ser nulo!',
            'string.min': 'Sala não pode ter menos de 1 caractere!',
            'string.max': 'Sala não pode ter mais de 60 caracteres!',
            'any.required': 'Sala é obrigatório!'
        }),
        message: Joi.string().min(1).max(60).required().messages({
            'string.empty': 'Mensagem não pode ser nulo!',
            'string.min': 'Mensagem não pode ter menos de 1 caractere!',
            'string.max': 'Mensagem não pode ter mais de 60 caracteres!',
            'any.required': 'Mensagem é obrigatório!'
        })
    });
}

module.exports = {
    initiateValidate,
    messageValidate
};
