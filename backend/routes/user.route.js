import express from "express";
import { SignUp, login, logout } from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/protectRoute.js";
const router = express.Router();

router.post('/signup', SignUp);
router.post('/login', login);
router.get('/logout',logout)


export default router;