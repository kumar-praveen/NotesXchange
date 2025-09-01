import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
      folder: "notesXchange_Notes",
      use_filename: true,
      unique_filename: false,
      format: "pdf",
    });

    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Failed to delete local file:", err);
      else console.log("Local file deleted:", localFilePath);
    });

    return response;
  } catch (error) {
    console.log("Upload error:", error);
    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Failed to delete local file:", err);
    });
    return null;
  }
};

export default cloudinary;
