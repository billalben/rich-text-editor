"use strict";

const optionsButtons = document.querySelectorAll(".option-button");
const advancedOptionButton = document.querySelectorAll(".adv-option-button");
const fontName = document.getElementById("fontName");
const fontSizeRef = document.getElementById("fontSize");
const writingArea = document.getElementById("text-input");
const linkButton = document.getElementById("createLink");
const alignButtons = document.querySelectorAll(".align");
const spacingButtons = document.querySelectorAll(".spacing");
const formatButtons = document.querySelectorAll(".format");
const scriptButtons = document.querySelectorAll(".script");

// List of font list
const fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

// Initial Settings
const initializer = () => {
  // function calls for highlighting buttons
  // No highlights for link, unlink,lists, undo,redo since they are one time operations
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  // create options for font names
  fontList.map((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    fontName.appendChild(option);
  });

  // fontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    fontSizeRef.appendChild(option);
  }

  // default size
  fontSizeRef.value = 3;
};

// main logic
const modifyText = (command, defaultUi, value) => {
  // execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

// For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

// options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

// link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");

  if (!userLink) return;

  // if link has http then pass directly else add https
  if (/http:\/\/|https:\/\//i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

// Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      // needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        // If currently clicked button is already active
        if (button.classList.contains("active")) alreadyActive = true;

        // Remove highlight from other buttons
        highlighterRemover(className);

        if (!alreadyActive) button.classList.add("active");
      } else {
        // if other buttons can be highlighted
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.addEventListener("load", initializer);
