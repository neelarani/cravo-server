import { fileUploader } from '@/shared';
import type { IFoodItem } from './interface';
import { FoodItem } from './model';

export const createMenu = async (
  payload: IFoodItem,
  file?: Express.Multer.File
) => {
  if (file) {
    const uploadResult = await fileUploader.uploadToCloudinary(file);
    payload.img = uploadResult?.secure_url as string;
  }

  const menu = await FoodItem.create({
    name: payload.name,
    title: payload.title,
    price: payload.price,
    img: payload.img,
    description: payload.description,
    category: payload.category,
  });
  return menu;
};

// GET ALL MENU
export const getAllMenu = async () => {
  const menus = await FoodItem.find();
  return menus;
};

// GET SINGLE MENU
export const getSingleMenu = async (id: string) => {
  const menu = await FoodItem.findById(id);
  return menu;
};

// UPDATE MENU
export const updateMenu = async (
  id: string,
  payload: Partial<IFoodItem>,
  file?: Express.Multer.File
) => {
  let updatedData = { ...payload };

  // If new image uploaded
  if (file) {
    const uploaded = await fileUploader.uploadToCloudinary(file);
    updatedData.img = uploaded?.secure_url;
  }

  const updatedMenu = await FoodItem.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  return updatedMenu;
};

// DELETE MENU
export const deleteMenu = async (id: string) => {
  const deletedMenu = await FoodItem.findByIdAndDelete(id);
  return deletedMenu;
};
