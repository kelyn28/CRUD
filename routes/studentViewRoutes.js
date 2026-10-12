
import express from "express";

import {
    showStudents,
    insertFromView,
    showEditForm,
    updateFromView,
    deleteFromView
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", showStudents);
router.post("/insert", insertFromView);
router.get("/edit/:id", showEditForm);
router.post("/edit/:id", updateFromView);
router.post("/delete/:id", deleteFromView);

export default router;
