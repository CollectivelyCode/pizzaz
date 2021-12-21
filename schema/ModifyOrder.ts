import Joi from "joi";

const ModifyOrder = Joi.object({
    readyForPickup: Joi.bool(),
    readyForKitchen: Joi.bool()
})

export default ModifyOrder
