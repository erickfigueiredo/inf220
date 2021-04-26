const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        id_client: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id do comprador deve ser um interio!',
            'number.min': 'Id do comprador não pode ser menor que 1!',
            'number.empty': 'Id do comprador não pode ser vazio!',
            'any.required': 'Id do comprador é obrigatório!'
        }),
        id_adress: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id do endereço deve ser um interio!',
            'number.min': 'Id do endereço não pode ser menor que 1!',
            'number.empty': 'Id do endereço não pode ser vazio!',
            'any.required': 'Id do endereço é obrigatório!'
        }),
        products: Joi.array().items(Joi.number().required()).min(1).required().messages({
            'array.empty': 'Produtos não pode ser nulo!',
            'array.min': 'Deve ter pelo menos um produto!',
            'any.required': 'Produtos é obrigatório!',
            'array.includesRequiredKnowns': 'Deve ter pelo menos um produto!'
        }),
        quantity: Joi.array().items(Joi.number().required()).min(1).required().messages({
            'array.empty': 'Quantidade não pode ser nulo!',
            'array.min': 'Deve ter pelo menos uma quantidade!',
            'any.required': 'Quantidade é obrigatório!',
            'array.includesRequiredKnowns': 'Deve ter pelo menos uma quantidade!'
        })
    });
}

const updateValidate = () => {
    return Joi.object().keys({
        is_delivered: Joi.boolean().required().messages({
            'boolean.empty': 'Entregue não pode ser vazio!',
            'any.required': 'Entregue é obrigatório!'
        }),
    });
}

module.exports = {
    updateValidate,
    createValidate
};
