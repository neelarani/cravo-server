import z from 'zod';

export const foodItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  price: z.string('Price is required'),
  img: z.string().url('Invalid image URL').optional(),
  description: z.string().min(1, 'Description is required'),
  category: z.string('Category cannot be empty'),
});

export const foodItemUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  title: z.string().min(1, 'Title is required').optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  img: z.string().url('Invalid image URL').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  category: z.string('Category cannot be empty').optional(),
});
