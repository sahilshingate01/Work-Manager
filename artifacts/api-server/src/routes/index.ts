import { Router, type IRouter } from "express";
import healthRouter from "./health";
import worksRouter from "./works";
import aiRouter from "./ai";

const router: IRouter = Router();

router.use(healthRouter);
router.use(worksRouter);
router.use(aiRouter);

export default router;
