/* let notes = []; */
let noteId = 0;

const LOCAL_STORAGE_KEY = "noteapp-notes";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(title, content) {
  const notes = getNotes();

  if (notes === []) {
    noteId = 0;
  } else {
    noteId = notes.length;
  }

  noteId++;

  notes.push({
    id: noteId,
    title,
    content,
    lastUpdated: new Date().getTime(),
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function getNextId() {
  const notes = getNotes();

  const sortedNotes = notes.sort((noteA, noteB) => noteA.id - noteB.id);
  console.log(sortedNotes);
}

getNextId();
