"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
const googleapis_1 = require("googleapis");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
async function authorize() {
    try {
        const client = new googleapis_1.google.auth.JWT(process.env.GOOGLE_CLIENT_EMAIL, undefined, process.env.GOOGLE_PRIVATE_KEY?.split(String.raw `\n`).join("\n"), ["https://www.googleapis.com/auth/drive"]);
        await client.authorize();
        return client;
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to authorize Google Drive API");
    }
}
