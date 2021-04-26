const Joi = require('joi');

let datetime = new Date();
let eighteen = datetime.setMonth(datetime.getMonth() - 216);
eighteen = new Date(eighteen);
eighteen = eighteen.toISOString().slice(0, 10);

datetime = new Date();
let hundred = datetime.setFullYear(datetime.getFullYear() - 100);
hundred = new Date(hundred);
hundred = hundred.toISOString().slice(0, 10);

const createValidate = () => {
    return Joi.object().keys({
        name: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(1).max(50).required().messages({
            'string.pattern.base': 'Nome deve ter somente letras!',
            'string.empty': 'Nome não pode ser nulo!',
            'string.min': 'Nome não pode ter menos de 1 caractere!',
            'string.max': 'Nome não pode ter mais de 50 caracteres!',
            'any.required': 'Nome é obrigatório!'
        }),
        surname: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(1).max(50).required().messages({
            'string.pattern.base': 'Sobrenome deve ter somente letras!',
            'string.empty': 'Sobrenome não pode ser nulo!',
            'string.min': 'Sobrenome não pode ter menos de 1 caractere!',
            'string.max': 'Sobrenome não pode ter mais de 50 caracteres!',
            'any.required': 'Sobrenome é obrigatório!'
        }),
        email: Joi.string().email().min(10).max(150).required().messages({
            'string.email': 'Email inválido!',
            'string.empty': 'Email não pode ser nulo!',
            'any.required': 'Email é obrigatório!'
        }),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/).min(8).max(30).required().messages({
            'string.pattern.base': 'A senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial!',
            'string.min': 'Senha deve conter no mínimo 8 caracteres!',
            'string.max': 'Senha deve conter no máximo 30 caracteres!',
            'string.empty': 'É necessário informar uma senha!',
            'any.required': 'Senha é obrigatória!'
        }),
        tel: Joi.string().regex(/^[0-9]{11,12}$/).required().messages({
            'string.empty': 'Telefone não pode ser nulo!',
            'string.pattern.base': 'Telefone deve ter 11-12 caracteres numéricos!',
            'any.required': 'Telefone é obrigatório!'
        }),
        birthdate: Joi.date().iso().max(eighteen).min(hundred).required().messages({
            'date.max': 'Você deve ter 18 anos!',
            'date.min': 'Você não pode ter mas de 100 anos!',
            'date.empty': 'Nascimento não pode ser nulo!',
            'any.required': 'Nascimento é obrigatório!'
        }),
    });
}

const updateValidate = () => {
    return Joi.object().keys({
        name: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(1).max(50).messages({
            'string.pattern.base': 'Nome deve ter somente letras!',
            'string.min': 'Nome não pode ter menos de 1 caractere!',
            'string.max': 'Nome não pode ter mais de 50 caracteres!',
        }),
        surname: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(1).max(50).messages({
            'string.pattern.base': 'Sobrenome deve ter somente letras!',
            'string.min': 'Sobrenome não pode ter menos de 1 caractere!',
            'string.max': 'Sobrenome não pode ter mais de 50 caracteres!',
        }),
        email: Joi.string().email().messages({
            'string.email': 'Email inválido!'
        }),
        tel: Joi.string().regex(/^[0-9]{11,12}$/).messages({
            'string.pattern.base': 'Telefone deve ter 12-13 caracteres!'
        }),
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um interio!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'Id não pode ser vazio!',
            'any.required': 'Id é obrigatório!'
        })
    })
}

const loginValidate = async () => {
    return Joi.object().keys({
        email: Joi.string().email().required().messages({
            'string.email': 'Email inválido!',
            'string.empty': 'Email não pode ser inválido!',
            'any.required': 'Email é obrigatório!'
        }),
        password: Joi.string().min(8).max(30).required().messages({
            'string.empty': 'Senha não pode ser nulo!',
            'string.min': 'Senha não pode ter menos de 6 caracteres!',
            'string.max': 'Senha não pode ter mais de 30 caracteres!',
            'any.required': 'Senha é obrigatório!'
        })
    })
}

module.exports = {
    updateValidate,
    createValidate,
    loginValidate
};
