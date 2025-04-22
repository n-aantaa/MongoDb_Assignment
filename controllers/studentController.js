const Student = require("../model/Student");

// Get All Students
const GetAllStudents = async (req, res) => {
  try {
    const Students = await Student.find();
    if (!Students || Students.length === 0) {
      return res.status(404).json({ message: "No Students found!" });
    }
    res.json(Students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get One Student By ID
const GetStudent = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Student ID is required!" });
    }
    try {
      const Student = await Student.findById(id).exec();
      if (!Student) {
        return res.status(404).json({ message: `No Student matches ID ${id}` });
      }
      res.json(Student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
// Create New Student
const CreateNewStudent = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "First and Last Names are required!" });
  }
  try {
    const result = await Student.create({ firstName, lastName });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student
const UpdateStudent = async (req, res) => {
  const { id, firstName, lastName } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Student ID is required!" });
  }
  try {
    const Student = await Student.findById(id).exec();
    if (!Student) {
      return res.status(404).json({ message: `No Student matches ID ${id}` });
    }
    if (firstName) Student.firstName = firstName;
    if (lastName) Student.lastName = lastName;
    const result = await Student.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Student
const DeleteStudent = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Student ID is required!" });
  }
  try {
    const Student = await Student.findById(id).exec();
    if (!Student) {
      return res.status(404).json({ message: `No Student matches ID ${id}` });
    }
    const result = await Student.deleteOne({ _id: id });
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