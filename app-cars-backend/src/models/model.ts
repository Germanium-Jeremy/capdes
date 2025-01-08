import { required } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    names: { type: String, require: true },
    email: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    password: { type: String, require: true },
});

const garageStaffSchema = new mongoose.Schema({
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    garage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Garage',
        required: true
    },
    history: [{
        name: { type: String, require: true },
        time: { type: String, default: Date.now },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        details: String
    }],
    notification: [{
        name: String,
        time: { type: String, default: Date.now },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        details: String
    }],
    staffRole: {
        type: String,
        default: 'staff'
    }
})


const garageSchema = new mongoose.Schema({
    garageName: String,
    owner: String,
    location: String,
    mechanics: [{
        id: String
    }],
    tel: String,
    license: String,
    registrationProof: String,
    workingTime: String,
    waitList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mechanic',
        default: []
    }],
    history: [{
        name: String,
        time: String,
        details: String,
        default: []
    }]

})
const User = mongoose.model('User', userSchema);
const GarageStaff = mongoose.model('GarageStaff', garageStaffSchema)
const Garage = mongoose.model('Garage', garageSchema)
export default { User, GarageStaff, Garage }