"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema_1 = __importDefault(require("../schema/schema"));
const model_1 = __importDefault(require("../models/model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const JWT_SECRET = process.env.JWT_SECRET;
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
    },
    debug: true,
    logger: true
});
const testing = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield transporter.sendMail({
            from: '"Wilson Mwesigwa" bugiriwilson651@gmail.com', // sender address
            to: "bugiriwilson651@gmail.com", // recipient(s)
            subject: "Hello from Gmail", // subject line
            text: "Hello world!", // plain text
            html: "<b>Hello world! this is car-apps-</b>", // HTML body
        });
        console.log("Message sent: %s", info.messageId);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
});
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(password, salt);
    return hash;
});
const generateJWT = (id) => {
    const token = jsonwebtoken_1.default.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
    return token;
};
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = schema_1.default.registrationSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }
        const { names, email, password, phoneNumber } = value;
        const isRegistered = yield model_1.default.User.findOne({ email: email });
        if (isRegistered) {
            res.status(400).json({ message: 'user already exists' });
            return;
        }
        const hashedPassword = yield hashPassword(password);
        const user = new model_1.default.User({ names, email, password: hashedPassword, phoneNumber, role: 'user' });
        yield user.save();
        res.status(200).json({ message: 'signup success' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});
const registerMechanic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = schema_1.default.garageStaffSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }
        const { companyId, whatsappNumber, userId } = value;
        const mechanic = new model_1.default.Mechanic({ details: userId, garage: companyId, whatsappNumber });
        yield mechanic.save();
        yield model_1.default.User.findByIdAndUpdate(userId, { role: 'mechanic' });
        res.status(200).json({ message: 'signup success' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});
const registerGarageOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = schema_1.default.garageStaffSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }
        const { companyId, whatsappNumber, userId } = value;
        const mechanic = new model_1.default.Mechanic({ details: userId, garage: companyId, whatsappNumber });
        yield mechanic.save();
        yield model_1.default.User.findByIdAndUpdate(userId, { role: 'owner' });
        res.status(200).json({ message: 'signup success' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});
const registerGarage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = schema_1.default.garageSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }
        const { name } = value;
        const isRegistered = yield model_1.default.Garage.findOne({ name: name }).select('name');
        if (isRegistered) {
            res.status(400).json({ message: 'Garage already exists' });
            return;
        }
        const newGarage = new model_1.default.Garage(value);
        yield newGarage.save();
        res.status(200).json({ message: newGarage._id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error' });
    }
});
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = schema_1.default.signInSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }
        const { email, password } = value;
        const isRegistered = yield model_1.default.User.findOne({ email: email }).select('id password');
        if (!isRegistered) {
            res.status(400).json({ message: 'invalid email or password' });
            return;
        }
        const isAuthorized = yield bcrypt_1.default.compare(password, (isRegistered === null || isRegistered === void 0 ? void 0 : isRegistered.password) || '');
        if (!isAuthorized) {
            res.status(400).json({ message: 'invalid email or password' });
            return;
        }
        const token = generateJWT(isRegistered === null || isRegistered === void 0 ? void 0 : isRegistered.id);
        res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error' + JWT_SECRET });
    }
});
exports.default = {
    testing,
    signUp,
    registerMechanic,
    registerGarageOwner,
    registerGarage,
    signIn
};
