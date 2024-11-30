"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const connectDB = async () => {
    try {
        const uri = process.env.DB_URI;
        if (!uri) {
            throw new Error('MongoDB connection URI is missing');
        }
        await mongoose_1.default.connect(uri);
        console.log('MongoDB connected successfully');
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
exports.default = connectDB;
