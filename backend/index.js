require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");
const Note = require("./models/note.model");

const app = express();

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

// ✅ Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // allow cookies
  })
);

// ✅ Routes
app.get("/", (req, res) => res.json({ data: "Hello.." }));

// CREATE ACCOUNT
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: true, message: "All fields required" });
  }

  const isUser = await User.findOne({ email });
  if (isUser) return res.json({ error: true, message: "User already exists" });

  const newUser = new User({ fullName, email, password });
  await newUser.save();

  const accessToken = jwt.sign({ user: newUser }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user: newUser,
    accessToken,
    message: "Registration Successful",
  });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: true, message: "Email & Password required" });

  const userInfo = await User.findOne({ email });
  if (!userInfo) return res.status(400).json({ error: true, message: "User not found" });

  if (userInfo.password === password) {
    const accessToken = jwt.sign({ user: userInfo }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });
    return res.json({ error: false, message: "Login Successful", accessToken, user: userInfo });
  } else {
    return res.status(400).json({ error: true, message: "Invalid credentials" });
  }
});

// GET USER
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findById(user._id);
  if (!isUser) return res.sendStatus(401);
  res.json({ user: { fullName: isUser.fullName, email: isUser.email, _id: isUser._id, createdOn: isUser.createdOn } });
});

// ADD NOTE
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title || !content) return res.status(400).json({ error: true, message: "Title & Content required" });

 try {
  const newNote = new Note({
    title,
    content,
    tags: tags || [],
    userId: user._id,
  });

  await newNote.save();

  return res.status(201).json({
    error: false,
    note: newNote,
    message: "Note added successfully",
  });
} catch (error) {
  console.error("Error adding note:", error);

  return res.status(500).json({
    error: true,
    message: "Internal server error",
  });
}

});

// DELETE NOTE
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { user } = req.user;

  const note = await Note.findOne({ _id: noteId, userId: user._id });
  if (!note) return res.status(404).json({ error: true, message: "Note not found" });

  await Note.deleteOne({ _id: noteId, userId: user._id });
  return res.json({ error: false, message: "Note deleted successfully" });
});

// UPDATE NOTE PINNED
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { isPinned } = req.body;
  const { user } = req.user;

  const note = await Note.findOne({ _id: noteId, userId: user._id });
  if (!note) return res.status(404).json({ error: true, message: "Note not found" });

  if (isPinned !== undefined) note.isPinned = isPinned;
  await note.save();

  res.json({ error: false, note, message: "Note updated successfully" });
});

// SEARCH NOTES
app.get("/search-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) return res.status(400).json({ error: true, message: "Search query required" });

  const matchingNotes = await Note.find({
    userId: user._id,
    $or: [
      { title: { $regex: new RegExp(query, "i") } },
      { content: { $regex: new RegExp(query, "i") } },
    ],
  });

  res.json({ error: false, notes: matchingNotes, message: "Notes retrieved successfully" });
});

// GET ALL NOTES
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
  res.json({ error: false, notes, message: "All notes retrieved" });
});

// EDIT NOTE
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = tags;

    await note.save();
    res.json({ error: false, note, message: "Note updated successfully" });
  } catch (error) {
    console.error("Edit Note Error:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
