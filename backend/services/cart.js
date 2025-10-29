import Joi from "joi";


export const validateObj = {
    postCartDtl:Joi.object({
        cartId:Joi.number().required(),
        productId:Joi.number().required(),
        quantity:Joi.number().integer().required()
    })
}