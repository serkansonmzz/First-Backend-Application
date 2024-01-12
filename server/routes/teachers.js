import { Router } from "express";
import { createTeachers } from "../utils/constants.js";
import {
  validateRequestParams,
  validateQueryParams,
  validatePostRequestParams,
  validatePostParams,
} from "../utils/middleware.js";
import { matchedData } from "express-validator";
import { faker } from "@faker-js/faker";

const router = Router();
let teachers = createTeachers(10);

router.get(
  "/teachers",
  validateRequestParams,
  validateQueryParams,
  (request, response) => {
    const {
      query: { filter, value },
    } = request;
    if (filter && value) {
      return response.send(
        teachers.filter((teacher) => teacher[filter].includes(value))
      );
    }

    response.status(200).json(teachers);
  }
);

router.get("/teachers/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  const teacher = teachers.find((teacher) => teacher.id === teacherId);
  if (!teacher) {
    return res.status(404).json({ message: `Teacher not found` });
  } else {
    res.status(200).json(teacher);
  }
});

router.post(
  "/teachers",
  validatePostRequestParams,
  validatePostParams,
  (request, res) => {
    // const teacher = createTeachers(1)[0];
    const data = matchedData(request);
    const teacher = {
      id: faker.string.uuid(),
      ...data,
    };

    teachers.push(teacher);
    res.status(201).json(teacher);
  }
);

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
