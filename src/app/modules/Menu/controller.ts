import { catchAsync } from '@/shared/utils/catchAsync';
import * as service from './service';
import { sendResponse } from '@/shared/common/sendResponse';
import { HTTP_CODE } from '@/shared/constants/httpStatusCode';

export const createMenu = catchAsync(async (req, res) => {
  const menu = req.body;

  const createdMenu = await service.createMenu(menu, req.file);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.CREATED,
    message: `Menu Created Successfully!`,
    data: createdMenu,
  });
});

// GET ALL
export const getAllMenu = catchAsync(async (req, res) => {
  const menus = await service.getAllMenu();

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: `Menu fetched successfully!`,
    data: menus,
  });
});

// GET SINGLE
export const getSingleMenu = catchAsync(async (req, res) => {
  const id = req.params.id;

  const menu = await service.getSingleMenu(id!);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: `Menu fetched successfully!`,
    data: menu,
  });
});

// UPDATE
export const updateMenu = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updatedMenu = await service.updateMenu(id!, req.body, req.file);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: `Menu Updated Successfully!`,
    data: updatedMenu,
  });
});

// DELETE
export const deleteMenu = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deletedMenu = await service.deleteMenu(id!);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: `Menu Deleted Successfully!`,
    data: deletedMenu,
  });
});
