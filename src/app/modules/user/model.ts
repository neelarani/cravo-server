import { Schema, model } from 'mongoose';
import { Role, type IUser } from './interface';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    avatar_url: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export const User = model('User', userSchema);
