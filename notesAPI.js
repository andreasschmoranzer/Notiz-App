const LOCAL_STORAGE_KEY = "noteapp-notes";
let editExistingNote = false;
let noteId = 0;

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(title, content, noteId) {
  const notes = getNotes();

  if (editExistingNote === true) {
    alert("Hallo");
    console.log(noteId);
    /* notes.push({
      id: noteId,
      title,
      content,
      lastUpdated: new Date().getTime(),
    }); */
  } else if (editExistingNote === false) {
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

function getExistingId() {
  noteId = Number(note.getAttribute("data-id"));
  console.log(noteId);
  const selectedNoteIndex = notes.findIndex((item) => item.id === noteId);
  console.log(selectedNoteIndex);
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
  const selectedNoteTitle = note.getAttribute("data-title");
  const selectedNoteContent = note.getAttribute("data-content");

  noteTitleEle.value = selectedNoteTitle;
  noteContentEle.value = selectedNoteContent;

  editExistingNote = true;

  getExistingId();
}
/* 
function test() {
  const persons = ["Maria", "Johann", "Martin", "Xaver", "Blasius"];

  persons.splice(3, 1);
  console.log(persons);
}

test(); */

/* function test2() {
  const notes = getNotes();
  console.log(notes);
}

test2(); */
