'use strict';

export const trashDisplay = (event) => {
    const addResourceBtn = document.querySelector(".add-resource-btn");
    const resourceForm = document.querySelector(".resource-form");
    const resourceSection = document.querySelector(".resource-section");
  
    addResourceBtn.addEventListener("click", () => {
      if (window.getComputedStyle(resourceForm).display === "none") {
        resourceForm.style.display = "block";
        resourceSection.style.filter = "blur(2px)";
        document.body.style.transition = "all 0.3s ease-in-out";
      } else {
        resourceForm.style.display = "none";
        resourceSection.style.filter = "";
        document.body.style.transition = "all 0.3s ease-in-out";
      }
      // ability to hide display if click anywhere on body but resource form
      document.addEventListener("click", (event) => {
        if (
          !addResourceBtn.contains(event.target) &&
          !resourceForm.contains(event.target)
        ) {
          resourceForm.style.display = "none";
          resourceSection.style.filter = "";
          document.body.style.transition = "all 0.3s ease-in-out";
        }
      });
    });
  }
  trashDisplay();