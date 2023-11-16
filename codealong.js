const express = require("express");
const fs = require("fs").promises;

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Our hello user app is now listening on http://localhost:3000");
});

const getAllNotes = async () => {
  return JSON.parse(await fs.readFile("../data/data.json", "utf8"));
};

const getNote = async (id) => {
  const data = await fs.readFile("../data/data.json", "utf8");
  const notes = JSON.parse(data);
  return notes.find((note, i) => i === id);
};

const deleteNote = async (id) => {
  const data = await fs.readFile("../data/data.json", "utf8");
  const notes = JSON.parse(data).filter((note, i) => i !== id);
  const jsonVersion = JSON.stringify(notes, null, 2);
  await fs.writeFile("../data/data.json", jsonVersion, "utf8");
};

app.get("/read-notes", async (req, res) => {
  const notes = await getAllNotes();
  res.send(JSON.stringify(notes, null, 2));
});

app.get("/read-note/:id", async (req, res) => {
  const note = await getNote(Number(req.params.id));
  res.send(JSON.stringify(note));
});

app.get("/delete-note/:id", async (req, res) => {
  await deleteNote(Number(req.params.id));
  res.send("Successfully deleted note.");
});