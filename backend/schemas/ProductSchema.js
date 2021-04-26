const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        title: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(1).max(50).required().messages({
            'string.pattern.base': 'Título deve ter somente letras!',
            'string.empty': 'Título não pode ser nulo!',
            'string.min': 'Título não pode ter menos de 1 caractere!',
            'string.max': 'Título não pode ter mais de 50 caracteres!',
            'any.required': 'Título é obrigatório!'
        }),
        description: Joi.string().min(1).required().messages({
            'string.min': 'Descrição deve ter pelo menos 1 caractere!',
            'string.empty': 'Descrição não pode ser nula!',
            'any.required': 'Descrição é obrigatório!'
        }),
        price: Joi.number().min(1).required().messages({
            'number.empty': 'Preço não pode ser nulo!',
            'number.min': 'Preço não pode ser menor que 1!',
            'any.required': 'Preço é obrigatório!'
        }),
        quantity: Joi.number().min(1).required().messages({
            'number.empty': 'Quantidade não pode ser nulo!',
            'number.min': 'Quantidade não pode ser menor que 1!',
            'any.required': 'Quantidade é obrigatório!'
        }),
        quality: Joi.string().regex(/^[1,2,3]{1}$/).required().messages({
            'string.pattern.base': 'Qualidade deve ser 1, 2 ou 3!',
            'string.empty': 'Qualidade não pode ser nulo!',
            'string.pattern.base': 'Qualidade deve ter 1 caractere!',
            'any.required': 'Qualidade é obrigatório!'
        }),
        width: Joi.number().precision(2).required().messages({
            'number.precision': 'Largura tem a precisão de duas casas decimais!',
            'number.empty': 'Largura não pode ser vazio!',
            'any.required': 'Largura é obrigatório!'
        }),
        height: Joi.number().precision(2).required().messages({
            'number.precision': 'Altura tem a precisão de duas casas decimais!',
            'number.empty': 'Altura não pode ser vazio!',
            'any.required': 'Altura é obrigatório!'
        }),
        depth: Joi.number().precision(2).required().messages({
            'number.precision': 'Altura tem a precisão de duas casas decimais!',
            'number.empty': 'Altura não pode ser vazio!',
            'any.required': 'Altura é obrigatório!'
        }),
        style: Joi.string().regex(/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(30).required().messages({
            'string.pattern.base': 'Estilo deve conter apenas letras!',
            'string.min': 'Estilo de trabalho precisa ter no mínimo 3 letras!',
            'string.max': 'Estilo de trabalho pode ter no máximo 30 letras!',
            'string.empty': 'Estilo de trabalho não pode ser vazio',
            'any.required': 'Estilo de trabalho é obrigatório!'
        }),
        id_material: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id material deve ser um inteiro',
            'number.min': 'Id material não pode ser menor que 1',
            'number.empty': 'Id material não pode ser vazio',
            'any.required': 'Id material é obrigatório'
        }),
        id_salesman: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id vendedor deve ser um inteiro',
            'number.min': 'Id vendedor não pode ser menor que 1',
            'number.empty': 'Id vendedor não pode ser vazio',
            'any.required': 'Id vendedor é obrigatório'
        })
    });
}

const updateValidate = () => {
    return Joi.object().keys({
        title: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(1).max(50).messages({
            'string.pattern.base': 'Título deve ter somente letras!',
            'string.empty': 'Título não pode ser nulo!',
            'string.min': 'Título não pode ter menos de 1 caractere!',
            'string.max': 'Título não pode ter mais de 50 caracteres!'
        }),
        description: Joi.string().min(1).messages({
            'string.min': 'Descrição deve ter pelo menos 1 caractere!',
            'string.empty': 'Descrição não pode ser nula!'
        }),
        price: Joi.number().min(1).messages({
            'number.empty': 'Preço não pode ser nulo!',
            'number.min': 'Preço não pode ser menor que 1!'
        }),
        discount: Joi.number().min(0).max(99).messages({
            'number.empty': 'Desconto não pode ser nulo!',
            'number.min': 'Desconto não pode ser menor que 0!',
            'number.max': 'Desconto não pode ser maior que 99!'
        }),
        quantity: Joi.number().min(1).messages({
            'number.empty': 'Quantidade não pode ser nulo!',
            'number.min': 'Quantidade não pode ser menor que 1!'
        }),
        quality: Joi.string().regex(/^[1,2,3]{1}$/).messages({
            'string.pattern.base': 'Qualidade deve ser 1, 2 ou 3!',
            'string.empty': 'Qualidade não pode ser nulo!',
            'string.pattern.base': 'Qualidade deve ter 12-13 caracteres numéricos!'
        }),
        width: Joi.number().precision(2).required().messages({
            'number.precision': 'Largura tem a precisão de duas casas decimais!',
            'number.empty': 'Largura não pode ser vazio!',
            'any.required': 'Largura é obrigatório!'
        }),
        height: Joi.number().precision(2).required().messages({
            'number.precision': 'Altura tem a precisão de duas casas decimais!',
            'number.empty': 'Altura não pode ser vazio!',
            'any.required': 'Altura é obrigatório!'
        }),
        depth: Joi.number().precision(2).required().messages({
            'number.precision': 'Altura tem a precisão de duas casas decimais!',
            'number.empty': 'Altura não pode ser vazio!',
            'any.required': 'Altura é obrigatório!'
        }),
        style: Joi.string().regex(/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(30).message({
            'string.pattern.base': 'Estilo deve conter apenas letras!',
            'string.min': 'Estilo de trabalho precisa ter no mínimo 3 letras!',
            'string.max': 'Estilo de trabalho pode ter no máximo 30 letras!'
        }),
        id_material: Joi.number().integer().min(1).messages({
            'number.integer': 'Id material deve ser um inteiro',
            'number.min': 'Id material não pode ser menor que 1'
        }),
        id_product: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id produto deve ser um inteiro',
            'number.min': 'Id produto não pode ser menor que 1',
            'number.empty': 'Id produto não pode ser vazio',
            'any.required': 'Id produto é obrigatório!'
        }),
        delete_image: Joi.array().items(Joi.string().required()).messages({
            'array.includes': 'Imagens para apagar deve conter pelo menos 1!',
            'array.empty': 'Imagens para apagar deve conter pelo menos 1!'
        })
    })
}

module.exports = {
    updateValidate,
    createValidate
};
