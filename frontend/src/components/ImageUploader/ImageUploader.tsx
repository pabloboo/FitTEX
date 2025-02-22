import React from 'react';
import './ImageUploader.css';

interface ImageUploaderProps {
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange }) => {
  return (
    <input
      id="file-upload"
      type="file"
      accept="image/*"
      onChange={onImageChange}
      style={{ display: "none" }}
    />
  );
};

export default ImageUploader;