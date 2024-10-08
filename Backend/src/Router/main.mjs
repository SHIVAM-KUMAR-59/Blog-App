import blogRoutes from "./blog.mjs";
import userRoutes from "./user.mjs";
import { Router } from "express";

const router = Router();
router.use(userRoutes);
router.use(blogRoutes);

export default router;
