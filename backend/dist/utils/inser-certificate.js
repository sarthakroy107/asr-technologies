"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCertificate = void 0;
const certificate_modell_1 = require("../db/models/certificate-modell");
const insertCertificate = async ({ name, email, certificateLink, courseName, issueDate, }) => {
    try {
        const newCertificate = new certificate_modell_1.Certificate({
            name,
            email,
            certificateLink,
            courseName,
            issueDate,
        });
        const savedCertificate = await newCertificate.save();
        console.log("Certificate saved:", savedCertificate);
    }
    catch (error) {
        console.error("Error saving certificate:", error);
    }
};
exports.insertCertificate = insertCertificate;
