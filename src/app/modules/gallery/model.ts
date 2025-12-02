import mongoose, { Schema } from 'mongoose';
import type { IGallery } from './interface';

const gallerySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model<IGallery>('Gallery', gallerySchema);

export default Gallery;
