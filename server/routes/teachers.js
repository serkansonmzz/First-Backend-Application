import { Router } from "express";
import { faker } from "@faker-js/faker";

const router = Router();
let teachers = [];

router.get("/teachers", (req, res) => {
  res.status(200).json(teachers);
});

router.get("/teachers/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  const teacher = teachers.find((teacher) => teacher.id === teacherId);
  if (!teacher) {
    return res.status(404).json({ message: `Teacher not found` });
  } else {
    res.status(200).json(teacher);
  }
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

router.put("/teachers/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  const teacher = teachers.find((teacher) => teacher.id === teacherId);

  if (!teacher) {
    return res.status(404).json({ message: `Teacher not found` });
  } else {
    const updatedTeacher = {
      id: teacherId,
      ...req.body,
    };

    teachers = teachers.map((teacher) =>
      teacher.id === teacherId ? updatedTeacher : teacher
    );

    res.status(200).json(updatedTeacher);
  }
});

router.patch("/teachers/:teacherId", (req, res) => {
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

router.delete("/teachers/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  teachers = teachers.filter((teacher) => teacher.id !== teacherId);
  res.send({ message: `Teacher deleted` });
});

export default router;
