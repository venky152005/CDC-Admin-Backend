import { Response, Request } from 'express';
import {Admin} from '../../model/admin.model.js';
import { AdminRequest } from '../../middleware/adminMiddleware.js';
import bcrypt from 'bcrypt';

export const getProfile = async (req: AdminRequest, res: Response):Promise<any> => {
    try {
        const adminId = req.admin?.id;  
        if (!adminId) {
            return res.status(400).json({ message: 'Admin ID is required' });
        }
        const admin = await Admin.findById(adminId).select('-password'); 
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateProfile = async (req: AdminRequest, res: Response):Promise<any> => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const adminId = req.admin?.id;

        if (!adminId) {
            return res.status(400).json({ message: 'Admin ID is required' });
        }
        const updateData: any = { firstName, lastName, email };
        if (password) { 
            updateData.password = bcrypt.hash(password, 10); 
        }
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true }).select('-password');
        if (!updatedAdmin) {    
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error('Error updating admin profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteProfile = async (req: AdminRequest, res: Response):Promise<any> => {
    try {
        const adminId = req.admin?.id;

        if (!adminId) {
            return res.status(400).json({ message: 'Admin ID is required' });
        }
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}