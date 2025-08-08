import { Router } from "express";
import * as todoController from "../controllers/todoController";

const router = Router();

router.route("/").post(todoController.createToDoEntry);
router.route("/").get(todoController.getAllToDoEntries);
router.route("/:id").get(todoController.getToDoEntry);
router.route("/:id").put(todoController.editToDoEntry);
router.route("/:id").delete(todoController.deleteToDoEntry);

export default router;
