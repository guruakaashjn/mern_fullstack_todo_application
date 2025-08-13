import { Router } from "express";
import * as todoController from "../controllers/todoController";
import * as authMiddleware from "../middlewares/auth";

const router = Router();

router
  .route("/")
  .post(authMiddleware.verifyToken, todoController.createToDoEntry);
router
  .route("/")
  .get(authMiddleware.verifyToken, todoController.getAllToDoEntries);
router
  .route("/:id")
  .get(authMiddleware.verifyToken, todoController.getToDoEntry);
router
  .route("/:id")
  .put(authMiddleware.verifyToken, todoController.editToDoEntry);
router
  .route("/:id")
  .delete(authMiddleware.verifyToken, todoController.deleteToDoEntry);
router
  .route("/:id/enable-status")
  .patch(authMiddleware.verifyToken, todoController.enableStatusById);

export default router;
