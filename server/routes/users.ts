import { Router } from "express";
import { auth } from "../middleware/jwt";
import { login, me, register, verify } from "../dbFuncs/users";

const router = Router();

router.post('/signup', register);
router.post('/signin', login);
router.get('/me', auth, me);
router.get('/verify', auth, verify);

export default router;