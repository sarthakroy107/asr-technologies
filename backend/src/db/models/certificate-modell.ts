import mongoose, { Document, Schema } from 'mongoose';

// Define the User interface
export interface ICertificate {
  name: string;
  email: string;
  certificateLink: string;
  courseName: string;
  issueDate: Date;
  fileId: string;
}
// Define the schema
const CertificateSchema: Schema = new Schema<ICertificate>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  certificateLink: { type: String, required: true },
  courseName: { type: String, required: true },
  issueDate: { type: Date, required: true },
  fileId: { type: String, required: true, unique: true },
});

// Create and export the model
export const Certificate = mongoose.model<ICertificate>('Certificate', CertificateSchema);
