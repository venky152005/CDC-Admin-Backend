import {Router} from "express";
import multer from "multer";
import { Response } from "express";
import { adminMiddleware, AdminRequest } from "../../middleware/adminMiddleware.js";
import { login } from "../../controller/admin/login.js";
import { signup } from "../../controller/admin/signup.js";
import { signUp } from "../../controller/staff/signup.js";
import { deleteStaff, getStaff } from "../../controller/admin/staff.js";
import { acceptRegistration, deleteRegistration, getRegistration, updateRegistration } from "../../controller/admin/registration.js";
import { addStudentManually, addStudents, deleteStudent, getStudents } from "../../controller/admin/student.js";
import { deleteProfile, getProfile, updateProfile } from "../../controller/admin/profile.js";

const adminrouter = Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

adminrouter.post("/login", login);
adminrouter.post("/signUp", signup);
adminrouter.post("/staff",adminMiddleware, signUp);
adminrouter.get("/getstaff",adminMiddleware, getStaff);
adminrouter.delete("/deletestaff",adminMiddleware, deleteStaff);
adminrouter.post("/getregistration", adminMiddleware, getRegistration);
adminrouter.delete("/deleteregistration", adminMiddleware, deleteRegistration);
adminrouter.put("/acceptregistration", adminMiddleware, acceptRegistration);
adminrouter.put("/updateregistration", adminMiddleware, updateRegistration);
adminrouter.post("/addstudents", adminMiddleware,upload.single("file"),addStudents);
adminrouter.get("/getstudents",adminMiddleware, getStudents);
adminrouter.post("/addstudentmanually", adminMiddleware, addStudentManually);
adminrouter.delete("/deletestudent", adminMiddleware, deleteStudent);
adminrouter.get("/getprofile", adminMiddleware, getProfile);
adminrouter.put("/updateprofile", adminMiddleware, updateProfile);
adminrouter.delete("/deleteprofile", adminMiddleware, deleteProfile);
adminrouter.get("/verify", adminMiddleware, (req: AdminRequest, res:Response) => {
    try {
    if(!req.admin?.id){
      res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ message: "Admin verified", success: true ,loggedIn: true });
    } catch (error) {
        console.error('Error verifying admin:', error); 
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});

export default adminrouter;