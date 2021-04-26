const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        email: Joi.string().email().required().messages({
            'string.email': 'Email inválido!',
            'string.empty': 'Email não pode ser nulo!',
            'any.required': 'Email é obrigatório!'
        }),
    });
}

const changeValidate = async () => {
    return Joi.object().keys({
        password: Joi.string().min(6).max(30).required().messages({
            'string.empty': 'Senha não pode ser nulo!',
            'string.min': 'Senha não pode ter menos de 6 caracteres!',
            'string.max': 'Senha não pode ter mais de 30 caracteres!',
            'any.required': 'Senha é obrigatório!'
        }),
    });
}

module.exports = {
    createValidate,
    changeValidate
};
