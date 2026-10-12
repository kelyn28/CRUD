import express from "express";

import {
    insertStudent,
    getAllStudents,
    getOneStudent,
    updateStudent,
    deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", insertStudent);
router.get("/", getAllStudents);
router.get("/:id", getOneStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
