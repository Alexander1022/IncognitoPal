import { Router } from "express";
import { auth } from "../middleware/jwt";
import { postMessage, getMessages } from "../dbFuncs/messages";

const router = Router();

router.post('/', auth, postMessage);
router.get('/', auth, getMessages);

export default router;