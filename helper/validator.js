import joi from 'joi';
import mongoose from 'mongoose';

export const validateRegister = (data) => {
    const schema = joi.object({
        username: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    });
    return schema.validate(data);
}

export const validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
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
        images: joi.string().allow("", null),
        owner: joi.string().required(),
    })
    return schema.validate(data)
}
const objectId = (value,helpers)=>{
    if(!mongoose.Types.ObjectId.isValid(value)){
        return helpers.error("any.invalid")
    }
    return value
}
export const idValidator = (data)=>{
    const schema = joi.object({
        id:joi.string().custom(objectId).required()
    })
    return schema.validate(data)
}