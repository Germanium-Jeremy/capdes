"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controllers/controller"));
const router = (0, express_1.Router)();
router.get('/', controller_1.default.testing);
router.post('/signUp', controller_1.default.signUp);
router.post('/registerMechanic', controller_1.default.registerMechanic);
router.post('/registerGarageOwner', controller_1.default.registerGarageOwner);
router.post('/registerGarage', controller_1.default.registerGarage);
router.post('/signIn', controller_1.default.signIn);
exports.default = router;
