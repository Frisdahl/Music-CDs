"use strict";

const author = document.getElementById("author-input");
const title = document.getElementById("title-input");
const year = document.getElementById("year-input");

const cdListContainer = document.getElementById("cd-list");
const btn = document.getElementById("add-btn");

let cdList = [];

btn.addEventListener("click", function saveCd(e) {
  e.preventDefault();

  // Check if all input fields are filled
  if (!author.value.trim() || !title.value.trim() || !year.value.trim()) {
    alert("All fields are required!");
    return;
  }

  // validation of authorinput
  const authorPattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/;
  if (!authorPattern.test(author.value)) {
    alert("Please enter a valid name");
    return;
  }

  // validation of titleinput
  const titlePattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/;
  if (!titlePattern.test(title.value)) {
    alert("Please enter a valid title");
    return;
  }

  // validation of yearinput
  const yearPattern = /^[0-9]{4}$/;
  if (!yearPattern.test(year.value)) {
    alert("Please enter a valid 4-digit year.");
    return;
  }

  // creating object that input values gets put into
  let cdInput = {
    author: author.value,
    title: title.value,
    year: year.value,
  };

  // Push the new cdInput object into the cdList array
  cdList.push(cdInput);

  // Clear input fields after saving the CD details
  author.value = "";
  title.value = "";
  year.value = "";

  // Re-render the list
  renderCdList();

  // Log the current cdList array to check if data is stored correctly
  console.log(cdList);
});

// Function to render the entire CD list
function renderCdList() {
  // Clear the current list
  cdListContainer.innerHTML = "";

  // Loop through the cdList array and create the markup for each item
  cdList.forEach((item, index) => {
    const markup = `
      <ul class="cd-list-ctn" data-index="${index}">
        <li><p>${item.author}</p></li>
        <li><p>${item.title}</p></li>
        <li><p>${item.year}</p></li>
        <li class="trash"><i class="fa-regular fa-trash-can" data-index="${index}"></i></li>
      </ul>
    `;

    // Append the markup to the cdListContainer
    cdListContainer.insertAdjacentHTML("beforeend", markup);

    // Add event listener to the trash icon for deleting the item
    const trashIcon = cdListContainer.querySelector(`i[data-index="${index}"]`);
    trashIcon.addEventListener("click", function () {
      deleteCd(index);
    });
  });
}

// Function to delete a CD entry by its index
function deleteCd(index) {
  // Remove the CD entry from the cdList array
  cdList.splice(index, 1);

  // Re-render the list after deleting the item
  renderCdList();

  // Log the updated cdList array
  console.log("Updated cdList:", cdList);
}
