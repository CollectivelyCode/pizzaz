import Joi from "joi";

const Item = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(100).optional(),
    sizes: Joi.array().items(Joi.string()).required()
})
export default Item
