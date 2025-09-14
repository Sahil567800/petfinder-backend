import joi from 'joi';

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
        email:joi.string().email().required(),
        password:joi.string().min(8).required()
    })
    return schema.validate(data);
}

export const validateEmail = (data)=>{
    const schema = joi.object({
        email:joi.string().email().required()})
    return schema.validate(data);
}

export const validatePassword = (data)=>{
    const schema = joi.object({
        password:joi.string().min(8).required()})
    return schema.validate(data);
}