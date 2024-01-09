import { Router } from "express";
import { auth } from "../middleware/jwt";
import { login, me, register } from "../dbFuncs/users";

const router = Router();

router.post('/signup', auth, register);
router.post('/signin', auth, login);
router.get('/me', auth, me);

export default router;