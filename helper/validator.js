import joi from 'joi';
import mongoose from 'mongoose';

export const validateRegister = (data) => {
    const schema = joi.object({
        username: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        role: joi.string().valid('buyer', 'seller', 'admin')
    });
    return schema.validate(data);
}

export const validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        role: joi.string().valid('buyer', 'seller', 'admin')
    })
    return schema.validate(data);
}

export const validateEmail = (data) => {
    const schema = joi.object({
        email: joi.string().email().required()
    })
    return schema.validate(data);
}

export const validatePassword = (data) => {
    const schema = joi.object({
        password: joi.string().min(8).required()
    })
    return schema.validate(data);
}

export const petValidator = (data) => {
    const schema = joi.object({
        name: joi.string().max(30).required(),
        breed: joi.string().required(),
        price: joi.number().required(),
        description: joi.string().max(300).required(),
        category: joi.string().valid("dog", "cat", "bird", "other").required(),
        owner: joi.string().required(),
    })
    return schema.validate(data)

}

export const updatePetValidator = (data) => {
    const schema = joi.object({
        name: joi.string().max(30),
        breed: joi.string(),
        price: joi.number(),
        description: joi.string().max(300),
        category: joi.string().valid("dog", "cat", "bird", "other"),
        images: joi.string(),
        owner: joi.string()
    }).min(1)
    return schema.validate(data)
}
const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid")
    }
    return value
}
export const idValidator = (data) => {
    const schema = joi.object({
        id: joi.string().custom(objectId).required()
    })
    return schema.validate(data)
}

export const orderValidator = (data) => {
    const schema = joi.object({
        pet: joi.string().required(),
        buyer: joi.string().required(),
        seller: joi.string().required(),
        status: joi.string().valid('pending', 'accepted', 'rejected').default("pending"),
        location: joi.object({
            street: joi.string().required(),
            city: joi.string().required(),
            zipcode: joi.string().required()
        }).required()
    })
    return schema.validate(data)
}