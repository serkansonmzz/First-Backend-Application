import { Router } from "express";
import { createStudents } from "../utils/constants.js";
import {
  validateRequestParams,
  validateQueryParams,
  validatePostRequestParams,
  validatePostParams,
} from "../utils/middleware.js";
import { matchedData } from "express-validator";
import { faker } from "@faker-js/faker";

const router = Router();
let students = createStudents(10);

router.get(
  "/students",
  validateRequestParams,
  validateQueryParams,
  (request, response) => {
    const {
      query: { filter, value },
    } = request;
    if (filter && value) {
      return response.send(
        students.filter((student) => student[filter].includes(value))
      );
    }

    response.status(200).json(students);
  }
);

router.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  const student = teachers.find((student) => student.id === studentId);
  if (!student) {
    return res.status(404).json({ message: `Student not found` });
  } else {
    res.status(200).json(student);
  }
});

router.post(
  "/students",
  validatePostRequestParams,
  validatePostParams,
  (request, res) => {
    // const student = createStudents(1)[0];
    const data = matchedData(request);
    const student = {
      id: faker.string.uuid(),
      ...data,
    };

    students.push(student);
    res.status(201).json(student);
  }
);

router.put("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  const student = students.find((student) => student.id === studentId);

  if (!student) {
    return res.status(404).json({ message: `Student not found` });
  } else {
    const updatedStudent = {
      id: studentId,
      ...req.body,
    };

    students = students.map((student) =>
      student.id === studentId ? updatedStudent : student
    );

    res.status(200).json(updatedStudent);
  }
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
