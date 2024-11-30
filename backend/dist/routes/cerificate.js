"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTCertificate = POSTCertificate;
const dotenv_1 = require("dotenv");
const create_pdf_1 = require("../utils/create-pdf");
const drive_1 = require("../utils/drive");
const zod_1 = require("zod");
const insert_certificate_1 = require("../utils/insert-certificate");
(0, dotenv_1.config)();
async function POSTCertificate(req, res) {
    try {
        const { name, course, date, email } = schema.parse(req.body);
        const certificate = await (0, create_pdf_1.generateCertificate)({
            name,
            course,
            date,
            email,
        });
        const driveResponse = await (0, drive_1.uploadToDrive)(certificate);
        if (!driveResponse.webViewLink || !driveResponse.id) {
            console.error("Drive response:", driveResponse);
            throw new Error("Error: Drive response does not contain a link or id");
        }
        console.log("drive id:" + driveResponse.id);
        //Entry to mongodb
        const certificateData = {
            name,
            email,
            certificateLink: driveResponse.webViewLink,
            courseName: course,
            issueDate: new Date(date),
            fileId: driveResponse.id,
        };
        await (0, insert_certificate_1.insertCertificate)(certificateData);
        res.status(200).json({
            message: "Certificate created successfully",
            link: driveResponse.webViewLink,
        }).header("Access-Control-Allow-Origin", "https://asr.aokura.site/");
    }
    catch (error) {
        console.error("Error creating certificate:", error);
        res.status(500).json({ message: "Error creating certificate" });
    }
}
const schema = zod_1.z.object({
    name: zod_1.z.string(),
    course: zod_1.z.string(),
    date: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
