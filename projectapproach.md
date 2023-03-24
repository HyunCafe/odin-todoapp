Initial Design Through Figma

---

The whole website will basically start out with Grid Structure first:
with only 2 columns

The main column will consist of 3 smaller columns
Column 1 = To Do (With Sort Function)
Column 2 = In Progress (With Sort Function)
Column 3 = Completed (With Sort Function)
with a side left navbar consisting of:

Home Title

Today (with material icon)
Next 7 Days (With martial icon)
All Tasks (with material icon)

(Border Separator)

Tags Title
(list up to 5 Most Popular tags, created through DOM module)
With Tag Title on one side, and # of times tags has been repeated on right side)

(Border Separator)

Status Title
In Progress
Completed
Trash

Create New Button

---

Game Plan

Break down the project into smaller tasks:
a. Create the structure for todo items using constructors or classes.
b. Implement project organization.
c. Separate application logic from DOM manipulation.
d. Design the User Interface.
e. Add localStorage for data persistence.

Design the data structure:
a. Create a Todo class with properties like title, description, dueDate, priority, notes, and checklist.
b. Create a Project class that contains a list of todos and a project title.

Implement project organization:
a. Create methods to add, edit, and delete projects.
b. Allow users to select a project and view the associated todos.

Separate application logic from DOM manipulation:
a. Create a module for DOM manipulation functions (e.g., render projects and todos).
b. Create a module for application logic (e.g., adding, editing, or deleting todos).

Design the User Interface:
a. Create a layout similar to Trello, with columns for each project.
b. Display todos as cards within the columns.
c. Allow users to expand cards to see or edit details.
d. Implement drag-and-drop functionality for moving todos between projects or changing their order.

Implement localStorage for data persistence:
a. Write functions to save and load projects and todos in localStorage.
b. Call these functions when the app is loaded and when changes are made to the data.
