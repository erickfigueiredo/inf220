const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        name: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(1).max(50).required().messages({
            'string.pattern.base': 'Nome deve conter apenas letras e espaços!',
            'string.empty': 'Nome não pode ser nulo!',
            'string.min': 'Nome não pode ter menos de 1 caractere!',
            'string.max': 'Nome não pode ter mais de 50 caracteres!',
            'any.required': 'Nome é obrigatório!'
        }),
        id_salesman: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'Id não pode ser vazio!',
            'any.required': 'Id não pode ser nulo!',
        })
    });
}

const updateValidate = () => {
    return Joi.object().keys({
        name: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(1).max(50).messages({
            'string.pattern.base': 'Nome deve conter apenas letras e espaços!',
            'string.empty': 'Nome não pode ser nulo!',
            'string.min': 'Nome não pode ter menos de 1 caractere!',
            'string.max': 'Nome não pode ter mais de 50 caracteres!',
        }),
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'Id não pode ser vazio!',
            'any.required': 'Id é obrigatório!'
        })
    });
}

module.exports = {
    createValidate,
    updateValidate
};
