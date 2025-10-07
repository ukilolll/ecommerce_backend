import Joi from "joi";

export const validateObj = {
        updateStatus:Joi.object({
        orderId:Joi.number().required(),
        status:Joi.string().max(30).required(),
    }),
    authorizeAdmin:Joi.object({
        userId:Joi.string().uuid().required(),
    })
}