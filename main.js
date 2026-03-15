const storageMobileEle = document.querySelector(".storage-mobile");
const storageDesktopEle = document.querySelector(".storage-desktop");
const saveButtonEle = document.querySelector(".save-note");
const noteTitleEle = document.getElementById("note-title-input");
const noteContentEle = document.getElementById("note-content-input");
const noteCardButtonEle = document.querySelector(".note-card");
const deleteButtonEle = document.querySelector(".delete-note");

// Frage an Frederik funktioniert das auch, wenn die Klasse auf mehrere HTML Elemente angewendet ist?
// saveButtonEle.addEventListener("click", saveNote);
// deleteButtonEle.addEventListener("click", () => alert("Hallo"));

// document.addEventListener("DOMContentLoaded", readLocalstorage);
displayStorageNotes();

function displayStorageNotes() {
  const notes = getNotes();

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

function saveButton() {
  const title = noteTitleEle.value;
  const content = noteContentEle.value;

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

  saveNote(title, content);
  displayStorageNotes();

  noteTitleEle.value = "";
  noteContentEle.value = "";
}
