import { Router } from "express";
import { faker } from "@faker-js/faker";

const router = Router();
let students = [];

router.get("/students", (req, res) => {
  res.status(200).json(students);
});

router.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  const student = teachers.find((student) => student.id === studentId);
  if (!student) {
    return res.status(404).json({ message: `Student not found` });
  } else {
    res.status(200).json(student);
  }
});

router.post("/students", (req, res) => {
  const student = {
    id: faker.string.uuid(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    sex: faker.person.sexType(),
    email: faker.internet.email(),
    telephone: faker.phone.number(),
    grade: faker.number.int({ min: 30, max: 100 }),
  };
  students.push(student);
  res.status(201).json(student);
});

router.patch("/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  const student = students.find((student) => student.id === studentId);

  if (!student) {
    return res.status(404).json({ message: `Student not found` });
  } else {
    const updatedStudent = {
      ...student,
      ...req.body,
    };

    students = students.map((student) =>
      student.id === studentId ? updatedStudent : student
    );

    res.status(200).json(updatedStudent);
  }
});

router.delete("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  students = students.filter((student) => student.id !== studentId);
  res.send({ message: `Student deleted` });
});

export default router;
