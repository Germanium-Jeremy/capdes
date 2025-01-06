import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    names: { type: String, require: true },
    email: String,
    phoneNumber: String,
    password: String,
    role: { type: String, default: 'user' },
});

const mechanicSchema = new mongoose.Schema({
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    garage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Garage',
        default: null
    },
    whatsappNumber: String,
    history: [{
        name: String,
        time: { type: String, default: Date.now },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
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
    }]
})

const ownerSchema = new mongoose.Schema({
    names: { type: String, require: true },
    email: String,
    phoneNumber: String,
    password: String,
    role: { type: String, default: 'owner' },
    companyName: String
})

const garageSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mechanic',
        default: null
    }],
    history: [{
        name: String,
        time: String,
        details: String
    }]

})
const User = mongoose.model('User', userSchema);
const Mechanic = mongoose.model('Mechanic', mechanicSchema)
const Owner = mongoose.model('Owner', ownerSchema)
const Garage = mongoose.model('Garage', garageSchema)
export default { User, Mechanic, Owner, Garage }