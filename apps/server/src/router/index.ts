import { Router } from "express";
import signInController from "../controllers/user-controller/signInController";

const router = Router();

router.post("/auth/signin", signInController);

export default router;