"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToDrive = uploadToDrive;
const googleapis_1 = require("googleapis");
const stream_1 = require("stream");
const google_auth_1 = require("../utils/google-auth");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
async function uploadToDrive(pdfBuffer) {
    try {
        console.log("Creating auth client...");
        const authClient = await (0, google_auth_1.authorize)();
        console.log("Initializing drive...");
        const drive = googleapis_1.google.drive({
            version: "v3",
            auth: authClient,
        });
        // Convert Buffer to Readable Stream
        const bufferStream = new stream_1.Readable();
        bufferStream.push(pdfBuffer);
        bufferStream.push(null); // Indicate the end of the stream
        if (!process.env.GOOGLE_DRIVE_FOLDER_ID) {
            throw new Error("Google Drive Folder ID not found");
        }
        console.log("Uploading certificate to drive-> 2");
        const response = await drive.files.create({
            requestBody: {
                name: "certificate.pdf",
                mimeType: "application/pdf",
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
            },
            media: {
                mimeType: "application/pdf",
                body: bufferStream,
            },
            fields: "id, webViewLink, kind, name, mimeType, parents, size, webContentLink",
        });
        console.log("Certificate uploaded successfully");
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to upload certificate to drive");
    }
}
