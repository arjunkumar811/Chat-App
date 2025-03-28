import express from 'express';
import { login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { protectRouter } from '../middleware/auth.middleware.js';

const router = express.Router();        

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.put('/update-profile', protectRouter, updateProfile)



export default router