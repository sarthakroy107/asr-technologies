import { Request, Response, NextFunction, RequestHandler } from "express";
import { Certificate } from "../db/models/certificate-modell";
import { authorize } from "./google-auth";
import { google } from "googleapis";

export const DELETECertificate: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      res.status(400).json({ message: "ID is required" });
      return; // Ensure void return
    }

    const certificate = await Certificate.findById(id);

    console.log(certificate);

    if (!certificate) {
      res.status(404).json({ message: "Certificate not found" });
      return; // Ensure void return
    }

    
    
    const authClient = await authorize();
    const drive = google.drive({ version: "v3", auth: authClient });
    
    await drive.files.delete({ fileId: certificate.fileId });
    
    console.log("Certificate deleted from Google Drive");
    
    await certificate.deleteOne();
    console.log("Certificate deleted from DB");

    res.status(200).json({
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
