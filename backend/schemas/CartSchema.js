const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        id_user: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id user deve ser um interio!',
            'number.min': 'Id user não pode ser menor que 1!',
            'number.empty': 'Id user não pode ser vazio!',
            'any.required': 'Id user é obrigatório!'
        }),
        id_product: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id Produto deve ser um interio!',
            'number.min': 'Id Produto não pode ser menor que 1!',
            'number.empty': 'Id Produto não pode ser vazio!',
            'any.required': 'Id Produto é obrigatório!'
        }),
        quantity: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Quantidade deve ser um interio!',
            'number.min': 'Quantidade não pode ser menor que 1!',
            'number.empty': 'Quantidade não pode ser vazio!',
            'any.required': 'Quantidade é obrigatório!'
        }),
    });
}

const updateValidate = () => {
    return Joi.object().keys({
        id_item: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id item deve ser um interio!',
            'number.min': 'Id item não pode ser menor que 1!',
            'number.empty': 'Id item não pode ser vazio!',
            'any.required': 'Id item é obrigatório!'
        }),
        quantity: Joi.number().integer().min(0).required().messages({
            'number.integer': 'Quantidade deve ser um interio!',
            'number.min': 'Quantidade não pode ser menor que 0!',
            'number.empty': 'Quantidade não pode ser vazio!',
            'any.required': 'Quantidade é obrigatório!'
        }),
    });
}

module.exports = {
    createValidate,
    updateValidate
};
