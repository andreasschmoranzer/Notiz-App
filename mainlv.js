const storageMobileEle = document.querySelector(".storage-mobile");
const storageDesktopEle = document.querySelector(".storage-desktop");
const saveButtonEl = document.querySelector(".save-note");
const titleInputEl = document.getElementById("note-title-input");
const contenInputEl = document.getElementById("note-content-input");

saveButtonEl.addEventListener("click", clickSaveButton);

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

function clickSaveButton() {
  const title = titleInputEl.value;
  const content = contenInputEl.value;

  if (!title || !content) {
    alert("Bitte Titel und Inhalt eingeben.");
    return;
  }
}

displayStorageNotes();
