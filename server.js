const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./dbConfig");

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

const studentRoutes = require("./routes/routing");
app.use("/students", studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
