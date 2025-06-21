import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name: string;
    department: string;
    year: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {type: String},
    department: {type: String},
    year: {type: String },
    email: { type: String},
    password: { type: String, },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", userSchema);