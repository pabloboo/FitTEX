import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { config } from '../config/config.js';

cloudinary.config(config.cloudinary);

export const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'my_app' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};