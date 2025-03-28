import express from 'express';  
import { protectRouter } from '../middleware/auth.middleware';

const router = express.Router();    

router.get('/users', protectRouter, getUserForSidebar)

export default router