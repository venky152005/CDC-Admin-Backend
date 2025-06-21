import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import adminrouter from "./routes/admin/route.admin.js";
import userRouter from "./routes/user/route.user.js";
import staffRouter from "./routes/staff/route.staff.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(!process.env.MONGODB_URI){
    console.error("Missing process.env.MONGODB_URI "),
    process.exit()
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

app.use("/admin",adminrouter)
app.use("/user",userRouter)
app.use("/staff",staffRouter)   

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});