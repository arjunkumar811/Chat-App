import express from 'express';  
import { protectRouter } from '../middleware/auth.middleware';
import { getMessages } from '../controllers/message.controller';

const router = express.Router();    

router.get('/users', protectRouter, getUserForSidebar)
router.get("/:id", protectRouter, getMessages)

export default router