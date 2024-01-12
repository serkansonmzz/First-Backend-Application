# First-Backend-Application

## 1.Clone the project:

git clone https://github.com/serkansonmzz/First-Backend-Application.git

## 2.Install dependencies:

Use either npm or pnpm to install the required packages (node_modules)

npm install # or

pnpm install

## 3.Start the development server:

Use either npm or pnpm to start the server:

npm run start:dev

pnpm run start:dev

## Note: ## You can adjust startup settings in the package.json file if needed.

## RESTful API Endpoints

The RESTful API exposes the following endpoints:

-GET /students

- Returns a list of all students.

-GET /teachers

- Returns a list of all teachers.

-GET /students/:id

- Returns a single student by ID.

-GET /teachers/:id

- Returns a single teacher by ID.

-POST /students

- Creates a new student.

-POST /teachers

- Creates a new teacher.

-PUT /students/:id

- Updates an existing student.

-PUT /teacher/:id

- Updates an existing teacher.

-PATCH /students/:id

- Updates students' specific attributes

-PATCH /teachers/:id

- Updates teachers' specific attributes

-DELETE /students/:id

- Deletes a student by ID.

-DELETE /teachers/:id

- Deletes a teacher by ID.
