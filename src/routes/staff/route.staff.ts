import { Router } from "express";
import { signUp } from "../../controller/staff/signup";
import { login } from "../../controller/staff/login";

const staffRouter = Router();

staffRouter.post("/signup", signUp);
staffRouter.post("/login", login);

export default staffRouter;
