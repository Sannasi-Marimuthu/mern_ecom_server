import express from 'express'
import { registerUser, verifyUser } from '../controllers/userController.js';

const router = express.Router()

//post 
router.post("/user/register", registerUser)
router.post("/user/verify", verifyUser)



export default router;