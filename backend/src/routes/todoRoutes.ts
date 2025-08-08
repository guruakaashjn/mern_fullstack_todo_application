import { Router } from "express";

const router = Router();

router.route("/").post();
router.route("/").get();
router.route("/:id").get();
router.route("/:id").put();
router.route("/:id").delete();
