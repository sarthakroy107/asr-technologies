import { readFileSync } from "fs";
import { TCertificateDetails } from "../routes/cerificate";
import { formatDate } from "../utils/format-date";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";


const coursivaFontBytes = readFileSync("assets/nk-mono.ttf");

export async function generateCertificate({
  name,
  course,
  date,
}: TCertificateDetails) {
  try {
    
    const pdfDoc = await PDFDocument.create();
    const templateBytes = readFileSync("assets/templete.png");
    
    const templateImage = await pdfDoc.embedPng(templateBytes);
    const page = pdfDoc.addPage([templateImage.width, templateImage.height]);
    
    page.drawImage(templateImage, {
      x: 0,
      y: 0,
      width: templateImage.width,
      height: templateImage.height,
    });
    
    const { width, height } = page.getSize();
    pdfDoc.registerFontkit(fontkit);
    const coursivaFont = await pdfDoc.embedFont(coursivaFontBytes);
    const helveticaFont = await pdfDoc.embedFont("Helvetica");
    
    page.drawText(`${name}`, {
      x: 650,
      y: height - 420,
      size: 72,
      font: coursivaFont,
      color: rgb(0.1137, 0.5098, 0.7569)
      ,
    });
    
    console.log("Drawing text-> 2");
    page.drawText(`Date: ${formatDate(date)}`, {
      x: 462,
      y: height - 600,
      size: 25,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    
    const pdfBytes = await pdfDoc.save();
    console.log("Certificate created successfully");
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate certificate");
  }
}