import { faker } from "@faker-js/faker";

export function createStudents(numberOfStudents) {
  return Array.from({ length: numberOfStudents }, () => ({
    id: faker.string.uuid(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    sex: faker.person.sexType(),
    email: faker.internet.email(),
    telephone: faker.phone.number(),
    grade: faker.number.int({ min: 30, max: 100 }),
  }));
}

export function createTeachers(numberOfTeachers) {
  return Array.from({ length: numberOfTeachers }, () => ({
    id: faker.string.uuid(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    sex: faker.person.sexType(),
    email: faker.internet.email(),
    telephone: faker.phone.number(),
    adress: faker.location.streetAddress(),
    department: faker.commerce.department(),
  }));
}
