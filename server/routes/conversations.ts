import { Router } from "express";
import { createConvesation, getConversation, getConversations } from "../dbFuncs/convs";
import { auth } from "../middleware/jwt";

const router = Router();

router.post('/create', auth, createConvesation);
router.get('/getAll', auth, getConversations);
router.get('/getOne', auth, getConversation);

export default router;