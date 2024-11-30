import { Request, Response } from "express";
import { config } from "dotenv";

import { generateCertificate } from "../utils/create-pdf";
import { uploadToDrive } from "../utils/drive";
import { z } from "zod";
import { insertCertificate } from "../utils/insert-certificate";
import { ICertificate } from "../db/models/certificate-modell";

config();

export type TCertificateDetails = {
  name: string;
  course: string;
  date: string;
  email: string;
};

export async function POSTCertificate(req: Request, res: Response) {
  try {
    const { name, course, date, email } = schema.parse(req.body);
    const certificate = await generateCertificate({
      name,
      course,
      date,
      email,
    });
    const driveResponse = await uploadToDrive(certificate);

    if (!driveResponse.webViewLink || !driveResponse.id) {
      console.error("Drive response:", driveResponse);
      throw new Error("Error: Drive response does not contain a link or id");
    }

    console.log("drive id:" + driveResponse.id);

    //Entry to mongodb
    const certificateData: ICertificate = {
      name,
      email,
      certificateLink: driveResponse.webViewLink,
      courseName: course,
      issueDate: new Date(date),
      fileId: driveResponse.id,
    };

    await insertCertificate(certificateData);

    res.status(200).json({
      message: "Certificate created successfully",
      link: driveResponse.webViewLink,
    }).header("Access-Control-Allow-Origin", "https://asr.aokura.site/");
  } catch (error) {
    console.error("Error creating certificate:", error);
    res.status(500).json({ message: "Error creating certificate" });
  }
}

const schema = z.object({
  name: z.string(),
  course: z.string(),
  date: z.string(),
  email: z.string().email(),
});
