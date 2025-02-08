import Joi from 'joi'

const regularUserSchema = Joi.object({
    names: Joi.string().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email is invalid',
        'any.required': 'Email is required',
    }),
    phoneNumber: Joi.string().required().messages({
        'string.empty': 'Phone number is required',
        'any.required': 'Phone number is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
})


const mechanicSchema = Joi.object({
    garageId: Joi.string().required().messages({
        'string.empty': 'Garage or Company name is required',
        'any.required': 'Garage or Company name is required'
    }),
    userId: Joi.string().required().messages({
        'string.empty': 'User is required',
        'any.required': 'User is required'
    })
})


const garageSchema = Joi.object({
    garageName: Joi.string().required().messages({
        'string.empty': 'garage name is required',
        'any.required': 'garage name is required'
    }),
    owner: Joi.string().required().messages({
        'string.empty': 'owner id is required',
        'any.required': 'owner id is required'
    }),
    location: Joi.string().required().messages({
        'string.empty': 'location id is required',
        'any.required': 'location id is required'
    }),
    tel: Joi.string().required().messages({
        'string.empty': 'garage tel is required',
        'any.required': 'garage tel is required'
    }),
    license: Joi.string().required().messages({
        'string.empty': 'license is required',
        'any.required': 'license is required'
    }),
    registrationProof: Joi.string().required().messages({
        'string.empty': 'registration proof is required',
        'any.required': 'registration proof is required'
    }),
    workingTime: Joi.string().required().messages({
        'string.empty': 'working time is required',
        'any.required': 'working time is required'
    })
})

const helpSupportSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'title is required',
        'any.required': 'title is required'
    }),
    body: Joi.string().required().messages({
        'string.empty': 'problem is required',
        'any.required': 'problem is required'
    }),
    type: Joi.string().required().messages({
        'string.empty': 'type is required',
        'any.required': 'type is required'
    })
})



export default {
    regularUserSchema,
    garageSchema,
    mechanicSchema,
    helpSupportSchema,
}
