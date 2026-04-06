const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Student = mongoose.model("Student", studentSchema);

// Save Data
app.post("/save", async (req, res) => {
    try {
        const data = new Student(req.body);
        await data.save();
        res.send("Message Saved");
    } catch (err) {
        res.status(500).send("Error");
    }
});

// Get Data
app.get("/students", async (req, res) => {
    const data = await Student.find();
    res.json(data);
});

// Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});