import mongoose, { Schema, type Model } from 'mongoose';
import type { IFoodItem } from './interface';

const FoodItemSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const FoodItem: Model<IFoodItem> =
  mongoose.models.FoodItem ||
  mongoose.model<IFoodItem>('FoodItem', FoodItemSchema);
