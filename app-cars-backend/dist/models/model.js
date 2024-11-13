"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    names: { type: String, require: true },
    email: String,
    phoneNumber: String,
    password: String,
    role: { type: String, default: 'user' },
});
const mechanicSchema = new mongoose_1.default.Schema({
    details: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    garage: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Garage',
        default: null
    },
    whatsappNumber: String,
});
const ownerSchema = new mongoose_1.default.Schema({
    names: { type: String, require: true },
    email: String,
    phoneNumber: String,
    password: String,
    role: { type: String, default: 'owner' },
    companyName: String
});
const garageSchema = new mongoose_1.default.Schema({
    name: String,
    owner: String,
    location: String,
    mechanics: [{
            id: String
        }],
    tel: String,
    license: String,
    registrationProof: String,
    email: String,
    workingTime: String,
    workingDays: String,
    waitList: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Mechanic',
            default: null
        }],
    history: [{
            name: String,
            time: String,
            details: String
        }]
});
const User = mongoose_1.default.model('User', userSchema);
const Mechanic = mongoose_1.default.model('Mechanic', mechanicSchema);
const Owner = mongoose_1.default.model('Owner', ownerSchema);
const Garage = mongoose_1.default.model('Garage', garageSchema);
exports.default = { User, Mechanic, Owner, Garage };
