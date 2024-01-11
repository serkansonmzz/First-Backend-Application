import express from "express";
import { faker } from "@faker-js/faker";
const router = express.Router();

let teachers = [];
let students = [];

router.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

router.get("/teachers", (req, res) => {
  res.json(teachers);
});

router.get("/students", (req, res) => {
  res.json(students);
});

router.post("/teachers", (req, res) => {
  const teacher = {
    id: faker.string.uuid(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    sex: faker.person.sexType(),
    email: faker.internet.email(),
    telephone: faker.phone.number(),
    birthdate: faker.date.birthdate(),
    adress: faker.location.streetAddress(),
  };
  teachers.push(teacher);
  res.json(teacher);
});

router.post("/students", (req, res) => {
  const student = {
    id: faker.string.uuid(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    sex: faker.person.sexType(),
    email: faker.internet.email(),
    telephone: faker.phone.number(),
    birthdate: faker.date.birthdate(),
    grade: faker.datatype.number({ min: 1, max: 12 }),
  };
  students.push(student);
  res.json(student);
});

router.delete("/teachers/:id", (req, res) => {
  const { id } = req.params;
  teachers = teachers.filter((teacher) => teacher.id !== id);
  res.send({ message: `Teacher deleted` });
});

router.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  students = students.filter((student) => student.id !== id);
  res.send({ message: `Student deleted` });
});

export default router;
