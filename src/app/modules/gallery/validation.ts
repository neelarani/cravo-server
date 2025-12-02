import z from 'zod';

export const gallerySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  img: z.string().url('Image must be a valid URL').optional(),
  category: z.string().optional(),
});
