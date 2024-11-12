import Joi from 'joi';


const registrationSchema = Joi.object({
    type: Joi.string().required().messages({
        'string.empty': 'Type is required',
        'any.required': 'Type is required',
    }),
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
});

const garageStaffSchema = Joi.object({
    userId: Joi.string().required().messages({
        'string.empty': 'user id is required',
        'any.required': 'user id is required'
    }),
    companyId: Joi.string().required().messages({
        'string.empty': 'Company id is required',
        'any.required': 'Company id is required',
    }),
    whatsappNumber: Joi.string().required().messages({
        'string.empty': 'whatsapp number is required',
        'any.required': 'whatsapp number is required',
    })

})

const garageSchema = Joi.object({
    name: Joi.string().required().messages({
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
    email: Joi.string().email().messages({
        'string.email': 'email is invalid',
    }),
    workingTime: Joi.string().required().messages({
        'string.empty': 'working time is required',
        'any.required': 'working time is required'
    })
})

const signInSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'invalid email',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(4).required().messages({
        'string.min': 'incorrect password',
        'any.required': 'password is required'
    })
})


export default {
    registrationSchema,
    garageStaffSchema,
    garageSchema,
    signInSchema
}
