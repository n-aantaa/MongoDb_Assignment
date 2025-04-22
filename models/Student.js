const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const studentSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  course: {
    type: String
  },
  enrolledDate: {
    type: String
  }
});

module.exports = mongoose.model("Student", studentSchema);