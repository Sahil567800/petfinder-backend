import nodemailer from "nodemailer"

export const sendResetEmail = async (email, resetLink) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MY_GMAIL,
                pass: process.env.MY_PASS
            }
        })
        const mailOptions = {
            from: process.env.MY_GMAIL,
            to: email,
            subject: "Password Reset Request",
            html:
                `<p>You requested a password reset </p>
            <p>Click the link below to reset your password </p>
            <a href ="${resetLink}">${resetLink}</a>
            <p> this link will expire in 1 hour,</p>
            `,
        };
        await transporter.sendMail(mailOptions);
}