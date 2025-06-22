import { Request, Response } from "express";
import xlsx from "xlsx";
import bcrypt from "bcrypt";
import { User } from "../../model/user.model";

export const addStudents = async(req: Request, res: Response)=>{
     try {
        const file = (req as any).file;

        const workbook = xlsx.read(file.buffer,{type: "buffer"});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json(sheet);

        const users = await Promise.all((rows as any[]).map(async(row)=>{
           const name = row.name||row.Name ;
           const department = row.department||row.Department ;
           const year = row.year||row.Year ;
           const email = row.email||row.Email;
           const plainPassword = (row.password||row.Password).toString();
           console.log(name, department, year, email, plainPassword);
           console.log(row);
           const hashedpassword = await bcrypt.hash(plainPassword,10)
           return{email, password:hashedpassword, name, department, year};
        }))
        console.log(users);

        const student = await User.insertMany(users, {ordered: false})

      res.status(200).json({message:"Successfully student created",success:true, student, StudentsCount: student.length})
     } catch (error) {
        res.status(500).json({message:"Failed to add students",error:(error as Error).message})
     }

}


export const addStudentManually = async (req: Request, res: Response):Promise<any> => {
    try {
        const { name, department, year, email, password } = req.body;

        if(!name){
            return res.status(400).json({ message: "Name is required" });
        }
        if(!department){
            return res.status(400).json({ message: "Department is required" });
        }
        if(!year){      
            return res.status(400).json({ message: "Year is required" });
        }
        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }
        if(!password){
                return res.status(400).json({ message: "Password is required" });
            }

            const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, department, year, email, password: hashedPassword });

        res.status(201).json({ message: "User created successfully", user, success: true });
    } catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}


export const getStudents = async(req: Request, res: Response)=>{
    try {
        const students = await User.find().select("-password");
        res.status(200).json({students});
    } catch (error) {
        res.status(500).json({message:"Failed to get students",error:(error as Error).message})
    }
}


export const deleteStudent = async (req: Request, res: Response):Promise<any> => {
    try {
        const { _id } = req.body;

        if(!_id){
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedUser = await User.findByIdAndDelete(_id);

        if(!deletedUser){
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error, success: false });
    }
}