import { google } from "googleapis";
import { Readable } from "stream";
import { authorize } from "../utils/google-auth";

import { config } from "dotenv";

config();

export async function uploadToDrive(pdfBuffer: Buffer) {
  try {
    console.log("Creating auth client...");

    const authClient = await authorize();
    console.log("Initializing drive...");
    const drive = google.drive({
      version: "v3",
      auth: authClient,
    });

    // Convert Buffer to Readable Stream
    const bufferStream = new Readable();
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
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
      },
      media: {
        mimeType: "application/pdf",
        body: bufferStream,
      },
      fields:
        "id, webViewLink, kind, name, mimeType, parents, size, webContentLink",
    });

    console.log("Certificate uploaded successfully");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload certificate to drive");
  }
}
