import express from "express";
import { faker } from "@faker-js/faker";
const router = express.Router();

let teachers = [];
let students = [];

router.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

router.get("/teachers", (req, res) => {
  res.status(200).json(teachers);
});

router.get("/students", (req, res) => {
  res.status(200).json(students);
});

router.post("/teachers", (req, res) => {
  const teacher = {
    id: faker.string.uuid(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    sex: faker.person.sexType(),
    email: faker.internet.email(),
    telephone: faker.phone.number(),
    adress: faker.location.streetAddress(),
  };
  teachers.push(teacher);
  res.status(201).json(teacher);
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

router.put("/teachers/:teacherId", (req, res) => {
  const { teacherId } = req.params;

  const teacher = teachers.find((teacher) => teacher.id === teacherId);

  if (!teacher) {
    return res.status(404).json({ message: `Teacher not found` });
  } else {
    const updatedTeacher = {
      ...teacher,
      ...req.body,
    };
    teachers = teachers.map((teacher) =>
      teacher.id === teacherId ? updatedTeacher : teacher
    );
    res.status(200).json(updatedTeacher);
  }
});

router.put("/students/:studentId", (req, res) => {
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

router.delete("/teachers/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  teachers = teachers.filter((teacher) => teacher.id !== teacherId);
  res.send({ message: `Teacher deleted` });
});

router.delete("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  students = students.filter((student) => student.id !== studentId);
  res.send({ message: `Student deleted` });
});

export default router;
