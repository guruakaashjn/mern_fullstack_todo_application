import { Router } from "express";
import * as userController from "../controllers/userControllers";

const router = Router();

router.route("/").post(userController.createUser);
router.route("/auth/signup").post(userController.signupUser);
router.route("/auth/login").post(userController.loginUser);
router.route("/auth/logout").post(userController.logoutUser);
router.route("/auth/refresh-token").post(userController.refreshToken);

export default router;
