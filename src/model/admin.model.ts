import mongoose from "mongoose";

export interface IAdmin extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const adminSchema = new mongoose.Schema<IAdmin>({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);