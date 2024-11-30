import { Request, Response } from "express";
import { Certificate } from "../db/models/certificate-modell";
import { z } from "zod";

export async function GETCertificates(req: Request, res: Response) {
  try {
    const certificates = await Certificate.find();
    let certArray = [];
    for (let i = 0; i < certificates.length; i++) {
      let cert: TCertificate = {
        id: certificates[i]._id.toString(),
        name: certificates[i].name,
        email: certificates[i].email,
        certificateLink: certificates[i].certificateLink,
        courseName: certificates[i].courseName,
        issueDate: certificates[i].issueDate.toISOString(),
      };
      certArray.push(cert);
    }

    certificateArraySchema.parse(certArray);

    res.status(200).json(certArray).header({
      "Access-Control-Allow-Credentials": true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
}

export const certficateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  certificateLink: z.string(),
  courseName: z.string(),
  issueDate: z.string(),
});

export const certificateArraySchema = z.array(certficateSchema);

export type TCertificate = z.infer<typeof certficateSchema>;
