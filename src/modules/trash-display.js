'use strict';

export const trashDisplay = (event) => {
  const trashIcon = document.querySelector("#trashFilter");
  const trashPopup = document.querySelector("#trash-popup");
  const mainContent = document.querySelector(".main");

  trashIcon.addEventListener("click", () => {
    const taskCardTrashIcons = [...document.querySelectorAll('.task__delete-icon')];
    if (window.getComputedStyle(trashPopup).display === "none") {
      trashPopup.style.display = "block";
      mainContent.style.pointerEvents = "none";
      document.body.classList.add("popup-active"); // add class to activate backdrop overlay
    }

    // Ability to hide display if click anywhere on body but trash column
    document.addEventListener("click", (event) => {
      if (
        !trashIcon.contains(event.target) &&
        !taskCardTrashIcons.some((icon) => icon.contains(event.target)) &&
        !trashPopup.contains(event.target)
      ) {
        trashPopup.style.display = "none";
        mainContent.style.pointerEvents = "auto";
        document.body.classList.remove("popup-active"); // remove class to deactivate backdrop overlay
      }
    });
  });
};

trashDisplay();