const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        value: Joi.number().precision(2).min(1).required().messages({
            'number.precision': 'Precisão máxima de 2 casas!',
            'number.empty': 'Valor não pode ser nulo!',
            'any.required': 'Valor é obrigatório!',
            'number.min': 'Valor mínimo de 1!'
        }),
        id_product: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um interio!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'Id não pode ser vazio!',
            'any.required': 'Id é obrigatório!'
        })
    });
}

const updateValidate = () => {
    return Joi.object().keys({
        value: Joi.number().precision(2).min(1).messages({
            'number.precision': 'Precisão máxima de 2 casas!',
            'number.empty': 'Valor não pode ser nulo!',
            'any.required': 'Valor é obrigatório!',
            'number.min': 'Valor mínimo de 1!'
        }),
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um interio!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'Id não pode ser vazio!',
            'any.required': 'Id é obrigatório!'
        })
    })
}

module.exports = {
    updateValidate,
    createValidate
};
