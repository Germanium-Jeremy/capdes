"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const registrationSchema = joi_1.default.object({
    type: joi_1.default.string().required().messages({
        'string.empty': 'Type is required',
        'any.required': 'Type is required',
    }),
    names: joi_1.default.string().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required',
    }),
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Email is invalid',
        'any.required': 'Email is required',
    }),
    phoneNumber: joi_1.default.string().required().messages({
        'string.empty': 'Phone number is required',
        'any.required': 'Phone number is required',
    }),
    password: joi_1.default.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
});
const garageStaffSchema = joi_1.default.object({
    userId: joi_1.default.string().required().messages({
        'string.empty': 'user id is required',
        'any.required': 'user id is required'
    }),
    companyId: joi_1.default.string().required().messages({
        'string.empty': 'Company id is required',
        'any.required': 'Company id is required',
    }),
    whatsappNumber: joi_1.default.string().required().messages({
        'string.empty': 'whatsapp number is required',
        'any.required': 'whatsapp number is required',
    })
});
const garageSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': 'garage name is required',
        'any.required': 'garage name is required'
    }),
    owner: joi_1.default.string().required().messages({
        'string.empty': 'owner id is required',
        'any.required': 'owner id is required'
    }),
    location: joi_1.default.string().required().messages({
        'string.empty': 'location id is required',
        'any.required': 'location id is required'
    }),
    tel: joi_1.default.string().required().messages({
        'string.empty': 'garage tel is required',
        'any.required': 'garage tel is required'
    }),
    license: joi_1.default.string().required().messages({
        'string.empty': 'license is required',
        'any.required': 'license is required'
    }),
    registrationProof: joi_1.default.string().required().messages({
        'string.empty': 'registration proof is required',
        'any.required': 'registration proof is required'
    }),
    email: joi_1.default.string().email().messages({
        'string.email': 'email is invalid',
    }),
    workingTime: joi_1.default.string().required().messages({
        'string.empty': 'working time is required',
        'any.required': 'working time is required'
    })
});
const signInSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.email': 'invalid email',
        'any.required': 'Email is required'
    }),
    password: joi_1.default.string().min(4).required().messages({
        'string.min': 'incorrect password',
        'any.required': 'password is required'
    })
});
exports.default = {
    registrationSchema,
    garageStaffSchema,
    garageSchema,
    signInSchema
};
