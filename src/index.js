
const setupEventListeners = () => {
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const content = document.querySelector("#content");
        content.innerHTML = "";
        switch (link.textContent.toLowerCase()) {
          case "home":
            content.append(createHeader());
            content.append(createMain());
            content.append(createFooter());
            setupEventListeners();
            break;
          case "menu":
            import("./modules/menu.js").then((module) => {
              content.append(module.default());
              setupEventListeners();
            });
            break;
          case "about":
            import("./modules/about.js").then((module) => {
              content.append(module.default());
              setupEventListeners();
            });
            break;
          case "reservations":
            import("./modules/reservations.js").then((module) => {
              content.append(module.default());
              setupEventListeners();
            });
            break;
          case "contact":
            import("./modules/contact.js").then((module) => {
              content.append(module.default());
              setupEventListeners();
            });
            break;
          default:
            break;
        }
      });
    });
  };
  
  setupEventListeners();
  

// Modify Above to fit into current project