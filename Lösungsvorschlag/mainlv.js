const storageMobileEle = document.querySelector(".storage-mobile");
const storageDesktopEle = document.querySelector(".storage-desktop");

const saveButtonMobileEle = document.querySelector("#save-note-mobile");
const saveButtonDesktopEle = document.querySelector("#save-note-desktop");
const createNoteButtonMobileEle = document.querySelector(".new-note");
const createNoteButtonDesktopEle = document.querySelector(".create-note");

const noteTitleEle = document.getElementById("note-title-input");
const noteContentEle = document.getElementById("note-content-input");
const noteCardButtonEle = document.querySelector(".note-card");
const deleteButtonEle = document.querySelector(".delete-note");

let replaceNote = false;
let noteId = null;

// Frage an Frederik funktioniert das auch, wenn die Klasse auf mehrere HTML Elemente angewendet ist?
saveButtonMobileEle.addEventListener("click", () => saveButton());
saveButtonDesktopEle.addEventListener("click", () => saveButton());
// deleteButtonEle.addEventListener("click", () => alert("Hallo"));
// document.addEventListener("DOMContentLoaded", readLocalstorage);

displayStorageNotes();
// applyListeners();
applyEventListener();

createNoteButtonMobileEle.addEventListener("click", () => newNoteButton());
createNoteButtonDesktopEle.addEventListener("click", () => newNoteButton());

function applyEventListener() {
  const noteEntriesEls = document.querySelectorAll(".note-card");

  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.addEventListener("click", () =>
      readAndDisplayNote(noteEntry.getAttribute("data-id")),
    );
  });
}

// Lösungsvorschlag:
/* function applyListeners() {
  const noteEntriesEls = document.querySelectorAll(".note-entry");

  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.addEventListener("click", () => selectNote(noteEntry.getAttribute("data-id")));
  });
} */

function displayStorageNotes() {
  const notes = getNotes();

  const sortedNotes = notes.sort(
    (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated,
  );

  let html = "";

  sortedNotes.forEach((note) => {
    html += `
    <div class="note-card" data-id="${note.id}" data-title="${note.title}" data-content="${note.content}">
      <h2 class="note-title">${note.title}</h2>
      <p class="note-content">${note.content}</p>
      <p class="note-date">${new Date(note.lastUpdated).toLocaleString("de-DE")}</p>
    </div>
    `;
  });

  storageMobileEle.innerHTML = html;
  storageDesktopEle.innerHTML = html;
}

function readAndDisplayNote(id) {
  const selectedNoteEl = document.querySelector(`.note-card[data-id="${id}"]`);
  console.log(selectedNoteEl);

  if (selectedNoteEl.classList.contains("selected-note")) return;
  deleteSelectedNoteClass();

  selectedNoteEl.classList.add("selected-note");

  noteId = Number(selectedNoteEl.getAttribute("data-id"));

  noteTitleEle.value = selectedNoteEl.getAttribute("data-title");
  noteContentEle.value = selectedNoteEl.getAttribute("data-content");

  replaceNote = true;
}

function saveButton() {
  const title = noteTitleEle.value;
  const content = noteContentEle.value;

  console.log(replaceNote);

  if (title === "" && content === "") {
    alert("Bitte Titel und Inhalt eingeben.");
    return;
  } else if (title === "" && content !== "") {
    alert("Bitte noch den Titel hinzufügen.");
    return;
  } else if (title !== "" && content === "") {
    alert("Bitte noch den Inhalt eingeben.");
    return;
  }

  saveNote(title, content, replaceNote);
  displayStorageNotes();
  // applyListeners();

  noteTitleEle.value = "";
  noteContentEle.value = "";
  applyEventListener();

  replaceNote = false;
}

function newNoteButton() {
  replaceNote = false;
  noteTitleEle.value = "";
  noteContentEle.value = "";
  deleteSelectedNoteClass();
}

function deleteSelectedNoteClass() {
  const noteCardEls = document.querySelectorAll(".note-card");
  noteCardEls.forEach((noteCard) => {
    noteCard.classList.remove("selected-note");
  });
}

// Lösungsvorschlag
/* function saveButton() {
  const title = noteTitleEle.value;
  const content = noteContentEle.value;

  console.log(replaceNote);

  if (title === "" && content === "") {
    alert("Bitte Titel und Inhalt eingeben.");
    return;
  } else if (title === "" && content !== "") {
    alert("Bitte noch den Titel hinzufügen.");
    return;
  } else if (title !== "" && content === "") {
    alert("Bitte noch den Inhalt eingeben.");
    return;
  }

  let currentId = undefined;

  const currentlySelectedNoteEl = document.querySelector(".selected-note");
  if (currentlySelectedNoteEl) {
    currentId = currentlySelectedNoteEl.getAttribute("data-id");
  }

  saveNote(title, content, Number(currentId));

  noteTitleEle.value = "";
  noteContentEle.value = "";
  // applyListeners();

  replaceNote = false;
} */

// Lösungsvorschlag
/* function selectNote(id) {
  const selectedNoteEl = document.querySelector(`.note-entry[data-id="${id}"]`);

  if (selectedNoteEl.classList.contains("selected-note")) return;

  const noteEntriesEls = document.querySelectorAll(".note-entry");
  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.classList.remove("selected-note");
  });

  selectedNoteEl.classList.add("selected-note");

  const notes = getNotes();

  const selectedNote = notes.find((note) => note.id === Number(id));

  if (!selectedNote) return;

  titleInputEl.value = selectedNote.title;
  contenInputEl.value = selectedNote.content;
} */
