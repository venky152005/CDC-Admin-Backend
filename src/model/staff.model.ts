import mongoose from "mongoose";

export interface IStaff extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    department: string;
    createdAt: Date;
    updatedAt: Date;
}

const staffSchema = new mongoose.Schema<IStaff>({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    department: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Staff = mongoose.model<IStaff>("Staff", staffSchema);
export default Staff;