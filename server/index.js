import express from "express";
import routes from "./routes/index.js";
const PORT = 8080;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});
