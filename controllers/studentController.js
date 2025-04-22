const Student = require("../models/Student");

const GetAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No Students found!" });
    }
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetStudent = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Student ID is required!" });
  }
  try {
    const student = await Student.findById(id).exec();
    if (!student) {
      return res.status(404).json({ message: `No Student matches ID ${id}` });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const CreateNewStudent = async (req, res) => {
  const { firstName, lastName, email, course, enrolledDate } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: "First name, last name, and email are required!" });
  }
  try {
    const result = await Student.create({ firstName, lastName, email, course, enrolledDate });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateStudent = async (req, res) => {
  const { id, firstName, lastName, email, course, enrolledDate } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Student ID is required!" });
  }
  try {
    const student = await Student.findById(id).exec();
    if (!student) {
      return res.status(404).json({ message: `No Student matches ID ${id}` });
    }
    if (firstName) student.firstName = firstName;
    if (lastName) student.lastName = lastName;
    if (email) student.email = email;
    if (course) student.course = course;
    if (enrolledDate) student.enrolledDate = enrolledDate;
    const result = await student.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteStudent = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Student ID is required!" });
  }
  try {
    const student = await Student.findById(id).exec();
    if (!student) {
      return res.status(404).json({ message: `No Student matches ID ${id}` });
    }
    const result = await student.deleteOne({ _id: id });
    res.json({ message: "Student deleted", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  GetAllStudents,
  CreateNewStudent,
  UpdateStudent,
  DeleteStudent,
  GetStudent,
};
