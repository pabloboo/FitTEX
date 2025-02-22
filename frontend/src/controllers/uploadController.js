import { uploadImage } from '../services/cloudinaryService.js';

export const uploadFile = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const imageUrl = await uploadImage(req.file.buffer);
    res.json({ imageUrl });
  } catch (error) {
    next(error);
  }
};