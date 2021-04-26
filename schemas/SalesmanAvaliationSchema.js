const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        liked: Joi.string().regex(/^(-1|0|1)$/).min(1).max(2).required().messages({
            'string.pattern.base': 'Curtiu deve ser \'-1\', \'0\', \'1\'',
            'string.empty': 'Curtiu não pode ser nulo!',
            'string.min': 'Curtiu não pode ter menos de 1 caractere!',
            'string.max': 'Curtiu não pode ter mais de 2 caracteres!',
            'any.required': 'Curtiu é obrigatório!'
        }),
        comment: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(1).max(1000).required().messages({
            'string.pattern.base': 'Comentário deve ter somente letras!',
            'string.empty': 'Comentário não pode ser nulo!',
            'string.min': 'Comentário não pode ter menos de 1 caractere!',
            'string.max': 'Comentário não pode ter mais de 1000 caracteres!',
            'any.required': 'Comentário é obrigatório!'
        }),
        id_order: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id ordem deve ser um interio',
            'number.min': 'Id ordem não pode ser menor que 1',
            'number.empty': 'Id ordem não pode ser vazio',
            'any.required': 'Id ordem é obrigatório'
        }),
        id_client: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id comprador deve ser um interio',
            'number.min': 'Id comprador não pode ser menor que 1',
            'number.empty': 'Id comprador não pode ser vazio',
            'any.required': 'Id comprador é obrigatório'
        }),
        id_salesman: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id vendedor deve ser um interio',
            'number.min': 'Id vendedor não pode ser menor que 1',
            'number.empty': 'Id vendedor não pode ser vazio',
            'any.required': 'Id vendedor é obrigatório'
        })
    });
}

const updateValidate = () => {
    return Joi.object().keys({
        liked: Joi.string().regex(/^(-1|0|1)$/).min(1).max(2).messages({
            'string.pattern.base': 'Curtiu deve ser \'-1\', \'0\', \'1\'',
            'string.empty': 'Curtiu não pode ser nulo!',
            'string.min': 'Curtiu não pode ter menos de 1 caractere!',
            'string.max': 'Curtiu não pode ter mais de 2 caracteres!',
            'any.required': 'Curtiu é obrigatório!'
        }),
        comment: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(1).max(1000).messages({
            'string.pattern.base': 'Comentário deve ter somente letras!',
            'string.empty': 'Comentário não pode ser nulo!',
            'string.min': 'Comentário não pode ter menos de 1 caractere!',
            'string.max': 'Comentário não pode ter mais de 1000 caracteres!',
            'any.required': 'Comentário é obrigatório!'
        }),
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um interio',
            'number.min': 'Id não pode ser menor que 1',
            'number.empty': 'Id não pode ser vazio',
            'any.required': 'Id é obrigatório'
        })
    })
}

module.exports = {
    updateValidate,
    createValidate
};
