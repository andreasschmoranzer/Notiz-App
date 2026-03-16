const LOCAL_STORAGE_KEY = "noteapp-notes";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(title, content) {
  const notes = getNotes();

  notes.push({
    id: getNextId(),
    title,
    content,
    lastUpdated: new Date().getTime(),
  });

  notes.sort((noteA, noteB) => noteA.id - noteB.id);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function getNextId() {
  const notes = getNotes();

  let noteId = 1;

  for (let i = 0; i < notes.length + 1; i++) {
    let findCurrentNoteId = notes.find((item) => item.id === noteId);
    if (findCurrentNoteId === undefined) {
      break;
    } else {
      noteId++;
    }
  }
  return noteId;
}

/* lösungsvorschlag: function getNextId() {
  const notes = getNotes();

  const sortedNotes = notes.sort((noteA, noteB) => noteA.id - noteB.id);
  
  let nextId = 1;

  for (let note of sortedNotes) {
  if(nextId < note.id) break;
  nextId = note.id + 1;
  }

  return nextId;
} */

function readAndDisplayNote(note) {
  const selectedNoteId = note.getAttribute("data-id");
  const selectedNoteTitle = note.getAttribute("data-title");
  const selectedNoteContent = note.getAttribute("data-content");

  noteTitleEle.value = selectedNoteTitle;
  noteContentEle.value = selectedNoteContent;
}
