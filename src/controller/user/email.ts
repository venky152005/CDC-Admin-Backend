import nodemailer from 'nodemailer';

export const sendEmail = async (email: string,subject: string, message: string): Promise<any> => {
    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: message
        };

        transporter.sendMail(mailOptions);                                                                                                                                                                                                                                                                                                                                                                                                       
    } catch (error) {
        console.error('Error sending email:', error);
    }
}