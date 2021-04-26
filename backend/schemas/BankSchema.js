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
        code: Joi.number().integer().min(001).max(999).required().messages({
            'number.integer': 'Código deve ser um número inteiro!',
            'number.min': 'Código não pode ter menos que 1 número!',
            'number.max': 'Código não pode ter mais que 3 números!',
            'any.required': 'Código é obrigatório!'
        }),
        ispb: Joi.number().integer().min(0).max(9999999999).required().messages({
            'number.integer': 'ISPB deve ser um número inteiro!',
            'number.min': 'ISPB precisa ser no mínimo 0!',
            'number.max': 'ISPB não pode ter mais que 10 números!',
            'any.required': 'ISPB é obrigatório!'
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
        code: Joi.number().integer().min(1).max(999).messages({
            'number.integer': 'Código deve ser um número inteiro!',
            'number.min': 'Código não pode ter menos que 1 número!',
            'number.max': 'Código não pode ter mais que 3 números!',
        }),
        ispb: Joi.number().integer().min(0).max(9999999999).messages({
            'number.integer': 'ISPB deve ser um número inteiro!',
            'number.min': 'ISPB precisa ser no mínimo 0!',
            'number.max': 'ISPB não pode ter mais que 10 números!',
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
