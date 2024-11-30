"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificateArraySchema = exports.certficateSchema = void 0;
exports.GETCertificates = GETCertificates;
const certificate_modell_1 = require("../db/models/certificate-modell");
const zod_1 = require("zod");
async function GETCertificates(req, res) {
    try {
        const certificates = await certificate_modell_1.Certificate.find();
        let certArray = [];
        for (let i = 0; i < certificates.length; i++) {
            let cert = {
                id: certificates[i]._id.toString(),
                name: certificates[i].name,
                email: certificates[i].email,
                certificateLink: certificates[i].certificateLink,
                courseName: certificates[i].courseName,
                issueDate: certificates[i].issueDate.toISOString(),
            };
            certArray.push(cert);
        }
        exports.certificateArraySchema.parse(certArray);
        res.status(200).json(certArray).header({
            "Access-Control-Allow-Credentials": true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
    }
}
exports.certficateSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    certificateLink: zod_1.z.string(),
    courseName: zod_1.z.string(),
    issueDate: zod_1.z.string(),
});
exports.certificateArraySchema = zod_1.z.array(exports.certficateSchema);
