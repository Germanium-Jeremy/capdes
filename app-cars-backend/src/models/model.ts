import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    names: { type: String, require: true },
    email: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    password: { type: String, require: true },
    recoverMode: { type: Boolean, default: false }
})

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
})

const garageOwnerSchema = new mongoose.Schema({
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
})


const garageSchema = new mongoose.Schema({
    garageName: String,
    owner: String,
    location: String,
    mechanics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GarageStaff',
        default: []
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

const helpSupportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    time: { type: Date, default: Date.now },
})

const resetCodeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    timeStamp: { type: Date, default: Date }
})

const User = mongoose.model('User', userSchema)
const GarageStaff = mongoose.model('GarageStaff', garageStaffSchema)
const GarageOwner = mongoose.model("GarageOwner", garageOwnerSchema)
const Garage = mongoose.model('Garage', garageSchema)
const HelpSupport = mongoose.model('HelpSupport', helpSupportSchema)
const ResetCode = mongoose.model('ResetCode', resetCodeSchema)

export default { User, GarageStaff, Garage, GarageOwner, HelpSupport, ResetCode }