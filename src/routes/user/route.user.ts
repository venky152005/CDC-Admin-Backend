import { Router } from "express";
import { login } from "../../controller/user/login";
import { deleteRegister, register, updateRegister } from "../../controller/user/register";
import { getRegister } from "../../controller/user/register";
import { forgotpassword, verifyOtp } from "../../controller/user/forgotpassword";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/register", register); 
userRouter.post("/getRegister", getRegister);
userRouter.put("/updateRegister", updateRegister);
userRouter.delete("/deleteRegister", deleteRegister);
userRouter.post("/verify", verifyOtp);
userRouter.post("/forgotpassword", forgotpassword); 

export default userRouter;