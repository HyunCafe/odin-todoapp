### Initial Design Through Figma

---
### HTML Structure
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

### Game Plan

#### Break down the project into smaller tasks:
* Create the structure for todo items using constructors or classes.
* Implement project organization.
* Separate application logic from DOM manipulation.
* Design the User Interface.
* Add localStorage for data persistence.

#### Design the data structure:
* Create a Todo class with properties like title, description, dueDate, priority, notes, and checklist.
* Create a Project class that contains a list of todos and a project title.
##### Modules
Will have Module for:
* todoitem.js (The class constructor template for notes)
* dom-manipulation.js (DOM Logic, appending, displaying, counters)
* local-storage.js (Saving, updating local storate)
* taskcategory.js (for organizing, sorting, edit and delete)


#### Implement project organization:
* Create methods to add, edit, and delete projects.
* Allow users to select a project and view the associated todos.

#### Separate application logic from DOM manipulation:
* Create a module for DOM manipulation functions (e.g., render projects and todos).
* Create a module for application logic (e.g., adding, editing, or deleting todos).

#### Design the User Interface:
* Create a layout similar to Trello, with columns for each project.
* Display todos as cards within the columns.
* Allow users to expand cards to see or edit details.
* Implement drag-and-drop functionality for moving todos between projects or changing their order.

#### Implement localStorage for data persistence:
* Write functions to save and load projects and todos in localStorage.
* Call these functions when the app is loaded and when changes are made to the data.



//Next Step is create the dispaly look for the appendages

// Feat: Add counter on each column representing total tasks
// Draggable between eachother as well as each column
// add counter for sidenavbar on tag counts
// Have the offcanvas grab the information from the selected Cards and also transfer the new values in
// Want to add calender view, will use fullcalender lib



// Using FullCalender Library, Date FNS library, sortableJS library