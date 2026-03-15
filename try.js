const saveButtonEl = document.querySelector(".test");
const saveButtonDivEl = document.querySelector(".test-parent");

console.log(saveButtonDivEl);

saveButtonDivEl.addEventListener("click", () => alert("Hallo"));
saveButtonEl.addEventListener("click", () => alert("Hallo"));
