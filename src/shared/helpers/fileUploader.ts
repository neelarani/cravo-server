import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

import DatauriParser from 'datauri/parser';
import config from '@/config';
import type { Request } from 'express';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

const parser = new DatauriParser();

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'video/mp4',
  'application/pdf',
];

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req: Request, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype))
      return cb(new Error(`Unsupported file type: ${file.mimetype}`));
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  if (!file) {
    throw new Error('Failed to upload file!');
  }

  const { content } = parser.format(file.originalname, file.buffer);

  if (!content) {
    throw new Error('cloudinary err: Server side err!');
  }

  const uploadResult = await cloudinary.uploader
    .upload(content, {
      public_id: file.originalname,
    })
    .catch((err: unknown) => {
      console.log(err);
    });

  return uploadResult;
};
