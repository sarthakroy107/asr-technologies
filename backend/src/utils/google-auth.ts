import { google } from "googleapis";
import { config } from "dotenv";

config();


export async function authorize() {
  try {
    const client = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      undefined,
      process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join("\n"),
      ["https://www.googleapis.com/auth/drive"]
    );
    await client.authorize();
    return client;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to authorize Google Drive API");
  }
}