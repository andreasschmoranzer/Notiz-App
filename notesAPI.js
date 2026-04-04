const LOCAL_STORAGE_KEY = "noteapp-notes";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(title, content, files, replaceNote) {
  const notes = getNotes();

  if (replaceNote === true) {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    notes[noteIndex] = {
      id: noteId,
      title,
      content,
      files,
      lastUpdated: new Date().getTime(),
    };
  } else {
    notes.push({
      id: getNextId(),
      title,
      content,
      files,
      lastUpdated: new Date().getTime(),
    });
  }

  notes.sort((noteA, noteB) => noteA.id - noteB.id);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function getNextId() {
  const notes = getNotes();

  noteId = 1;

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

function deleteNote(deleteNoteId) {
  const notes = getNotes();

  const filteredNotes = notes.filter((note) => note.id !== deleteNoteId);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredNotes));
}
