
import Student from "../models/Student.js";

// Validate student data
const validateStudent = (body) => {
    const { firstName, lastName, age, gender } = body;

    if (!firstName || !lastName || !age || !gender) {
        return "First name, last name, age, and gender are required.";
    }

    const parsedAge = Number(age);

    if (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 120) {
        return "Age must be a whole number from 1 to 120.";
    }

    return null;
};

// ACT 1 / ACT 2: INSERT STUDENT (API)
export const insertStudent = async (req, res) => {
    const error = validateStudent(req.body);

    if (error) {
        return res.status(400).json({ message: error });
    }

    const student = await Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: Number(req.body.age),
        gender: req.body.gender,
        type: req.body.type || "student",
        zip: req.body.zip || "",
        address: req.body.address || ""
    });

    return res.status(201).json({
        message: "Student inserted successfully.",
        student
    });
};

// ACT 2: VIEW ALL STUDENTS (API)
export const getAllStudents = async (req, res) => {
    const students = await Student.findAll({
        order: [["id", "ASC"]]
    });

    return res.status(200).json(students);
};

// ACT 2: VIEW ONE STUDENT (API)
export const getOneStudent = async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    return res.status(200).json(student);
};

// ACT 2: UPDATE STUDENT (API)
export const updateStudent = async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    const error = validateStudent(req.body);

    if (error) {
        return res.status(400).json({ message: error });
    }

    await student.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: Number(req.body.age),
        gender: req.body.gender,
        type: req.body.type || "student",
        zip: req.body.zip || "",
        address: req.body.address || ""
    });

    return res.status(200).json({
        message: "Student updated successfully.",
        student
    });
};

// ACT 2: DELETE STUDENT (API)
export const deleteStudent = async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    await student.destroy();

    return res.status(200).json({
        message: "Student deleted successfully."
    });
};

// ACT 3: SHOW STUDENTS PAGE
export const showStudents = async (req, res) => {
    const students = await Student.findAll({
        order: [["id", "ASC"]]
    });

    return res.render("students/insert", { students });
};

// ACT 3: INSERT FROM WEB FORM
export const insertFromView = async (req, res) => {
    const error = validateStudent(req.body);

    if (error) {
        return res.status(400).send(error);
    }

    await Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: Number(req.body.age),
        gender: req.body.gender,
        type: req.body.type || "student",
        zip: req.body.zip || "",
        address: req.body.address || ""
    });

    return res.redirect("/students");
};

// ACT 3: SHOW EDIT FORM
export const showEditForm = async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).send("Student not found.");
    }

    return res.render("students/edit", { student });
};

// ACT 3: UPDATE FROM WEB FORM
export const updateFromView = async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).send("Student not found.");
    }

    const error = validateStudent(req.body);

    if (error) {
        return res.status(400).send(error);
    }

    await student.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: Number(req.body.age),
        gender: req.body.gender,
        type: req.body.type || "student",
        zip: req.body.zip || "",
        address: req.body.address || ""
    });

    return res.redirect("/students");
};

// ACT 3: DELETE FROM WEB PAGE
export const deleteFromView = async (req, res) => {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
        return res.status(404).send("Student not found.");
    }

    await student.destroy();

    return res.redirect("/students");
};

