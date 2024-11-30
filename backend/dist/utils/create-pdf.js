"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCertificate = generateCertificate;
const fs_1 = require("fs");
const format_date_1 = require("../utils/format-date");
const pdf_lib_1 = require("pdf-lib");
const fontkit_1 = __importDefault(require("@pdf-lib/fontkit"));
const coursivaFontBytes = (0, fs_1.readFileSync)("assets/nk-mono.ttf");
async function generateCertificate({ name, course, date, }) {
    try {
        const pdfDoc = await pdf_lib_1.PDFDocument.create();
        const templateBytes = (0, fs_1.readFileSync)("assets/templete.png");
        const templateImage = await pdfDoc.embedPng(templateBytes);
        const page = pdfDoc.addPage([templateImage.width, templateImage.height]);
        page.drawImage(templateImage, {
            x: 0,
            y: 0,
            width: templateImage.width,
            height: templateImage.height,
        });
        const { width, height } = page.getSize();
        pdfDoc.registerFontkit(fontkit_1.default);
        const coursivaFont = await pdfDoc.embedFont(coursivaFontBytes);
        const helveticaFont = await pdfDoc.embedFont("Helvetica");
        page.drawText(`${name}`, {
            x: 650,
            y: height - 420,
            size: 72,
            font: coursivaFont,
            color: (0, pdf_lib_1.rgb)(0.1137, 0.5098, 0.7569),
        });
        console.log("Drawing text-> 2");
        page.drawText(`Date: ${(0, format_date_1.formatDate)(date)}`, {
            x: 462,
            y: height - 600,
            size: 25,
            font: helveticaFont,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        const pdfBytes = await pdfDoc.save();
        console.log("Certificate created successfully");
        return Buffer.from(pdfBytes);
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to generate certificate");
    }
}
