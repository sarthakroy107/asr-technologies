"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETECertificate = void 0;
const certificate_modell_1 = require("../db/models/certificate-modell");
const google_auth_1 = require("./google-auth");
const googleapis_1 = require("googleapis");
const DELETECertificate = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        if (!id) {
            res.status(400).json({ message: "ID is required" });
            return; // Ensure void return
        }
        const certificate = await certificate_modell_1.Certificate.findById(id);
        console.log(certificate);
        if (!certificate) {
            res.status(404).json({ message: "Certificate not found" });
            return; // Ensure void return
        }
        await certificate.deleteOne();
        console.log("Certificate deleted from DB");
        const authClient = await (0, google_auth_1.authorize)();
        const drive = googleapis_1.google.drive({ version: "v3", auth: authClient });
        await drive.files.delete({ fileId: certificate.fileId });
        console.log("Certificate deleted from Google Drive");
        res.status(204).json({
            message: "Certificate deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        next(error); // Use next for error handling
    }
};
exports.DELETECertificate = DELETECertificate;
