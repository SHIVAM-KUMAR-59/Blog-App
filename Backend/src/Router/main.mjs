// import blogRoutes from "./blog.mjs";
// import userRoutes from "./user.mjs";
import authRoutes from "./auth.mjs";
import { Router } from "express";

const router = Router();

router.use(authRoutes);
// router.use(userRoutes);
// router.use(blogRoutes);

export default router;
