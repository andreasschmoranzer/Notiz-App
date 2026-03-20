const storageMobileEle = document.querySelector(".storage-mobile");
const storageDesktopEle = document.querySelector(".storage-desktop");

const saveButtonMobileEle = document.querySelector("#save-note-mobile");
const saveButtonDesktopEle = document.querySelector("#save-note-desktop");
const createNoteButtonMobileEle = document.querySelector(".new-note");
const createNoteButtonDesktopEle = document.querySelector(".create-note");
const deleteButtonMobileEle = document.querySelector("#delete-note-mobile");
const deleteButtonDesktopEle = document.querySelector("#delete-note-desktop");

const noteTitleEle = document.getElementById("note-title-input");
const noteContentEle = document.getElementById("note-content-input");
const noteCardButtonEle = document.querySelector(".note-card");

let replaceNote = false;
let noteId = null;

saveButtonMobileEle.addEventListener("click", () => saveButton());
saveButtonDesktopEle.addEventListener("click", () => saveButton());

createNoteButtonMobileEle.addEventListener("click", () => newNoteButton());
createNoteButtonDesktopEle.addEventListener("click", () => newNoteButton());

deleteButtonMobileEle.addEventListener("click", () => deleteNoteButton());
deleteButtonDesktopEle.addEventListener("click", () => deleteNoteButton());

displayStorageNotes();
applyEventListener();

function applyEventListener() {
  const noteEntriesEls = document.querySelectorAll(".note-card");

  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.addEventListener("click", () =>
      readAndDisplayNote(noteEntry.getAttribute("data-id")),
    );
  });
}

function displayStorageNotes() {
  const notes = getNotes();

  const sortedNotes = notes.sort(
    (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated,
  );

  let html = "";

  sortedNotes.forEach((note) => {
    html += `
    <div class="note-card" data-id="${note.id}" data-title="${note.title}" data-content="${note.content}">
      <h2 class="note-title">${escapeHtml(note.title)}</h2>
      <p class="note-content">${escapeHtml(note.content)}</p>
      <p class="note-date">${new Date(note.lastUpdated).toLocaleString("de-DE")}</p>
    </div>
    `;
  });

  storageMobileEle.innerHTML = html;
  storageDesktopEle.innerHTML = html;
}

function readAndDisplayNote(id) {
  console.log("Hallo");
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

function deleteNoteButton() {
  const selectedNoteToDeleteEl = document.querySelector(".selected-note");

  let deleteNoteId = Number(selectedNoteToDeleteEl.getAttribute("data-id"));

  deleteNote(deleteNoteId);

  noteTitleEle.value = "";
  noteContentEle.value = "";

  displayStorageNotes();
  applyEventListener();

  replaceNote = false;
}

function deleteSelectedNoteClass() {
  const noteCardEls = document.querySelectorAll(".note-card");
  noteCardEls.forEach((noteCard) => {
    noteCard.classList.remove("selected-note");
  });
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
