import { ICertificate, Certificate } from "../db/models/certificate-modell";

export const insertCertificate = async ({
  name,
  email,
  certificateLink,
  courseName,
  issueDate,
  fileId
}: ICertificate) => {
  try {
    const newCertificate = new Certificate({
      name,
      email,
      certificateLink,
      courseName,
      issueDate,
      fileId,
    });

    const savedCertificate = await newCertificate.save();
    console.log("Certificate saved:", savedCertificate);
  } catch (error) {
    console.error("Error saving certificate:", error);
  }
};
