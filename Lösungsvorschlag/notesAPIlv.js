const LOCAL_STORAGE_KEY = "noteapp-notes";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(title, content, replaceNote) {
  const notes = getNotes();

  if (replaceNote === true) {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    notes[noteIndex] = {
      id: noteId,
      title,
      content,
      lastUpdated: new Date().getTime(),
    };
  } else {
    notes.push({
      id: getNextId(),
      title,
      content,
      lastUpdated: new Date().getTime(),
    });
  }

  notes.sort((noteA, noteB) => noteA.id - noteB.id);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

// Lösungsvorschlag
/* function saveNote(title, content, id = undefined) {
  const notes = getNotes();

  if (!id) {
    notes.push({
      id: getNextId(),
      title,
      content,
      lastUpdated: new Date().getTime(),
    });
  } else {
    const indexOfNoteWithId = notes.findIndex((note) => note.id === id);

    if (indexOfNoteWithId > -1) {
      notes[indexOfNoteWithId] = {
        id,
        title,
        content,
        lastUpdated: new Date().getTime(),
      };
    }
  }

  notes.sort((noteA, noteB) => noteA.id - noteB.id);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
} */

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
