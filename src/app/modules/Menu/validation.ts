import z from 'zod';

export const foodItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  price: z.number().positive('Price must be a positive number'),
  img: z.string().url('Invalid image URL'),
  description: z.string().min(1, 'Description is required'),
  category: z.string('Category cannot be empty'),
});
