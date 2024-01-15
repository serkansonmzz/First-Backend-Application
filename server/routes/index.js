import { Router } from "express";

import studentsRouter from "./students.js";
import teachersRouter from "./teachers.js";

const router = Router();

router.use(studentsRouter);
router.use(teachersRouter);

export default router;
