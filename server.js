const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB Connection (Works for Local + GitHub CI/CD)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentDB";

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB connection skipped or failed:", err.message));

// ✅ Schema (Updated with more fields)
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Student = mongoose.model("Student", studentSchema);

// ✅ POST API (Save Data)
app.post("/save", async (req, res) => {
    try {
        const data = new Student(req.body);
        await data.save();
        res.send("Data Saved Successfully");
    } catch (err) {
        res.status(500).send("Error saving data");
    }
});

// ✅ GET API (Fetch Data)
app.get("/students", async (req, res) => {
    try {
        const data = await Student.find();
        res.json(data);
    } catch (err) {
        res.status(500).send("Error fetching data");
    }
});

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("Student Portfolio Backend Running");
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});