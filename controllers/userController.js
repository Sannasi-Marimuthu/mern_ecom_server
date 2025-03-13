import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import sendMail from "../middleware/sendMail.js";


//new User Registration
export const registerUser = async (req, res) => {

    try {
        const { name, email, password, contact } = req.body;
        //code to check email address already exists   
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                message: "User Email Already Exists"
            });
        }
        //code to convert raw password to hashed password
        const hashPassword = await bcrypt.hash(password, 10);

        //generate otp 
        const otp = Math.floor(Math.random() * 1000000);

        //Create new user data
        user = { name, email, hashPassword, contact };

        //create signed activation token
        const activationToken = jwt.sign({ user, otp }, process.env.ACTIVATION_SECRET, {
            expiresIn: "5m"
        })

        //send email to user 
        const message = `Please Verify your account using otp is ${otp}`
        await sendMail(email, "Welcome to SAN", message);


        res.status(200).json({
            message: "otp send to your mail",
            activationToken,
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//verify otp
export const verifyUser = async (req, res) => {
    try {
        const { otp, activationToken } = req.body;
        const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
        if (!verify) {
            return res.json({
                message: "OTP Expired"
            });
        }
        if (verify.otp !== otp) {
            return res.json({
                message: "Wrong OTP"
            })
        }

        await User.create({
            name: verify.user.name,
            email: verify.user.email,
            password: verify.user.hashPassword,
            contact: verify.user.contact
        })

        res.status(200).json({
            message: "User Register Success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}