import mongoose from "mongoose";
import { type } from "os";

export interface IRegister extends mongoose.Document {
    studentName: string;
    registerNumber: string;
    ugDegree: string;
    ugStream: string;
    gender: string;
    dob: string;
    batch: string;
    tenthScore: string;
    tenthYOP: string;
    twelthScore: string;
    twelthYOP: string;
    diplomaScore: string;
    diplomaYOP: string;
    ugScoreCGPA: string;
    email: string;
    phone: string;
    parentMobile: string;
    nativeLocation: string;
    interestedStream: string;
    aadharNumber: string;
    panNumber: string;
    anyOnlineCourse: string;
    activeBacklogs:string;
    isAccepted: Boolean;
}

const registerSchema = new mongoose.Schema({
    studentName: {type: String},
    registerNumber: {type: String},
    ugDegree: {type: String},
    ugStream: {type: String},
    gender: {type: String},
    dob: {type: String},
    batch: {type: String},
    tenthScore: {type: String},
    tenthYOP: {type: String},
    twelthScore: {type: String},
    twelthYOP: {type: String},
    diplomaScore: {type: String},
    diplomaYOP: {type: String},
    ugScoreCGPA: {type: String},
    email: {type: String},
    phone: {type: String},
    parentMobile: {type: String},
    nativeLocation: {type: String},
    interestedStream: {type: String},
    aadharNumber: {type: String},
    panNumber: {type: String},
    anyOnlineCourse: {type: String},
    activeBacklogs: {type: String},
    isAccepted:{type: Boolean, default: false }
}); 

const Register = mongoose.model<IRegister>("Register", registerSchema);
export default Register;