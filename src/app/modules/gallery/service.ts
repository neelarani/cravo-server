import { fileUploader } from '@/shared';
import type { IGallery } from './interface';
import Gallery from './model';

export const createGallery = async (
  payload: IGallery,
  file?: Express.Multer.File
) => {
  if (file) {
    const uploadResult = await fileUploader.uploadToCloudinary(file);
    payload.img = uploadResult?.secure_url as string;
  }

  const gallery = await Gallery.create({
    title: payload.title,
    img: payload.img,
    description: payload.description,
    category: payload.category,
  });
  return gallery;
};

// GET ALL MENU
export const getAllGallery = async () => {
  const gallery = await Gallery.find();
  return gallery;
};
