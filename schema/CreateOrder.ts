import Joi from "joi";

const CreateOrder = Joi.object({
    items: Joi.array().items(Joi.object({
        itemId: Joi.number().required(),
        size: Joi.string().required(),
        notes: Joi.string().max(200).optional()
    })),
    nameForOrder: Joi.string().required()
})
export default CreateOrder
