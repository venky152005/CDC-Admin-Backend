import {Router} from "express";
import multer from "multer";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { login } from "../../controller/admin/login.js";
import { signup } from "../../controller/admin/signup.js";
import { signUp } from "../../controller/staff/signup.js";
import { getStaff } from "../../controller/admin/staff.js";
import { acceptRegistration, deleteRegistration, getRegistration, updateRegistration } from "../../controller/admin/registration.js";
import { addStudentManually, addStudents, getStudents } from "../../controller/admin/student.js";

const adminrouter = Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

adminrouter.post("/login", login);
adminrouter.post("/signUp", signup);
adminrouter.post("/staff",adminMiddleware, signUp);
adminrouter.get("/getstaff",adminMiddleware, getStaff);
adminrouter.post("/getregistration", adminMiddleware, getRegistration);
adminrouter.delete("/deleteregistration", adminMiddleware, deleteRegistration);
adminrouter.put("/acceptregistration", adminMiddleware, acceptRegistration);
adminrouter.put("/updateregistration", adminMiddleware, updateRegistration);
adminrouter.post("/addstudents", adminMiddleware,upload.single("file"),addStudents);
adminrouter.get("/getstudents",adminMiddleware, getStudents);
adminrouter.post("/addstudentmanually", adminMiddleware, addStudentManually);

export default adminrouter;