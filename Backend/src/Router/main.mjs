import blogRoutes from "./blog.mjs";
import userRoutes from "./user.mjs";
import authRoutes from "./auth.mjs";
import socialRoutes from "./social.mjs";
import { Router } from "express";

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(blogRoutes);
router.use(socialRoutes);

export default router;
