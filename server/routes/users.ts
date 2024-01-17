import { Router } from "express";
import { auth } from "../middleware/jwt";
import { getUser, login, me, register, verify } from "../dbFuncs/users";

const router = Router();

router.post('/signup', register);
router.post('/signin', login);
router.get('/me', auth, me);
router.get('/verify', auth, verify);
router.get('/getUser', auth, getUser);

export default router;