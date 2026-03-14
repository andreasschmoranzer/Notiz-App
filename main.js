const storageMobileEle = document.querySelector(".storage-mobile");
const storageDesktopEle = document.querySelector(".storage-desktop");

document.addEventListener("DOMContentLoaded", readLocalstorage);

function readLocalstorage() {
  const notesFromLocalstorage = JSON.parse(localStorage.getItem("Notes"));
  console.log(notesFromLocalstorage);

  if (notesFromLocalstorage === null) {
    notes = [];
    noteId = 0;
  } else {
    notes = notesFromLocalstorage;
    noteId = notes.length;
    displayStorageNotes();
  }
}

function displayStorageNotes() {
  // const notes = MOCK_NOTES;

  const sortedNotes = notes.sort(
    (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated,
  );

  let html = "";

  sortedNotes.forEach((note) => {
    html += `
    <div class="note-card" data-id="${note.id}">
      <h2 class="note-title">${note.title}</h2>
      <p class="note-content">${note.content}</p>
      <p class="note-date">${new Date(note.lastUpdated).toLocaleString("de-DE")}</p>
    </div>
    `;
  });

  storageMobileEle.innerHTML = html;
  storageDesktopEle.innerHTML = html;
}

// displayStorageNotes();

function saveNote() {
  noteId++;
  console.log(noteId);

  const noteTitleEle = document.getElementById("note-title-input").value;
  const noteContentEle = document.getElementById("note-content-input").value;

  const note = {
    id: noteId,
    title: noteTitleEle,
    content: noteContentEle,
    lastUpdated: new Date().getTime(),
  };

  console.log(note);

  notes.push(note);
  console.log(notes);

  // notes dynamisch anzeigen

  displayStorageNotes();

  // notes zum LocalStorage hinzufügen

  const saveNotesToLocalStorage = localStorage.setItem(
    "Notes",
    JSON.stringify(notes),
  );

  // Input Felder clearen

  document.getElementById("note-title-input").value = "";
  document.getElementById("note-content-input").value = "";
}
