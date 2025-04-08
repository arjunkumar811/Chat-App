import express from 'express';  
import { protectRouter } from '../middleware/auth.middleware';
import { getMessages, sendMessage } from '../controllers/message.controller';

const router = express.Router();    

router.get('/users', protectRouter, getUserForSidebar)
router.get("/:id", protectRouter, getMessages)

router.post("/send/:id", protectRouter, sendMessage)

export default router