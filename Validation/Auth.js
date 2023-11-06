import Joi from "joi";

export const ValidateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().
        email({ tlds: { allow: false } }).
        required().
        label('Email').
        messages({ 'string.empty': "email required" }),
        password: Joi.string().required().
        label('password').
        messages({ 'any.required': "password required" }),
    });

    const { error } = schema.validate(data,
        { abortEarly: true, allowUnknown: true });

    return __prepareErrorObject(error?.details);
}

export const validateRegister = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label('Name'),
        email: Joi.string().
        email({ tlds: { allow: false } }).
        required().
        label('Email').
        messages({ 'string.empty': "email required" }),
        password: Joi.string().required().
        label('password').
        messages({ 'any.required': "password required" }),
        confirmPassword: Joi.any().equal(Joi.ref('password'))
            .required()
            .label('Confirm password')
            .options({ messages: { 'any.only': '{{#label}} does not match'} })
    });

    const { error } = schema.validate(data,
        { abortEarly: true, allowUnknown: true });

    return __prepareErrorObject(error?.details);
}

// prepare error object of validation
const __prepareErrorObject = ((errors) => {
    let __errorObject = {};
    errors?.forEach(
        (_error) => __errorObject[_error.path[0]] = _error.message.replaceAll(
            '"', ''));
    return __errorObject;
});

export const __isErrors = (errors) => !(Object.keys(errors).length === 0 && errors.constructor === Object);