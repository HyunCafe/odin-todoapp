## Project Pre Plan Stage

### Initial Design Through Figma


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

### Beginning Project Design Game Plan

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

----------------------------------------

### Approaching Each Feature 
#### Tackling the Delete Feature
Add a delete icon to each task container in HTML structure. Use a data attribute (e.g., data-task-id) to store the unique task ID on the icon element.

Attach an event listener to the delete icon. Can use event delegation to listen for click events on a common parent element and filter by the delete icon selector.

In the event handler:
a. Retrieve the unique task ID from the clicked delete icon's data attribute.
b. Remove the task container from the DOM using the remove() method.
c. Remove the task from local storage:

Load tasks from local storage, parse them into an array of task objects.
Filter out the task with the matching ID.
Serialize the updated tasks array and save it back to local storage.
d. Update the task counters and any other related UI elements.
Test the delete feature to ensure tasks are removed from both the DOM and local storage, and the UI updates correctly in real time.

#### Tag Display Count Feature
Create an empty object to store tag counts.
Iterate through each task in local storage.
For each task, iterate through the tags array and increment the count for each tag in the tag count object.
Sort the tag count object by count in descending order.
Select the top five tags and display them in a tag cloud or list, along with their counts.
Update the tag cloud or list whenever a task is added or deleted.


#### Color Change based on Priority + Completed Column Block
Wanted to provide a visual indication when a task is moved to "Completed" column
initial idea was to store previous priority value of task and re-assign it when moved back to original column after some trial and error, it was more complicated, and added unnecessary complexity
Option 2: add and remove new CSS class "task--completed" on task element
Achieves same result as option 1
Easier to maintain
Choose option 2 as solution
discovered the On Drop event listener compared to on drag or click (Ended up using dragend alone)

#### Local Storage Save and Load
Create two main functions: saveCategories() and loadCategories().
saveCategories() function:
a. Serialize the tasksData object into a JSON string.
b. Save the JSON string to local storage using localStorage.setItem("tasks", jsonString).
loadCategories() function:
a. Retrieve the JSON string from local storage using localStorage.getItem("tasks").
b. Parse the JSON string into the tasksData object.
c. Check if tasksData is empty or doesn't exist. If so, set tasksData to the defaultTasks object and save it back to local storage.
In the main index.js file, call loadCategories() function at the start of the app to load the tasks from local storage.
After loading the tasks, update the UI by calling updateCategory(), tagTracker(), and updateTagDisplay() functions.
Whenever a task is added, edited, or deleted, call saveCategories() to save the updated tasksData object to local storage.
When tasks are moved to the trash, update the local storage by modifying the tasksData object and calling saveCategories().

#### Trash Feature
Create a new "Trash" column in the main section, hidden by default.
Modify the delete event handler in the dom-manipulation.js module:
a. When a task is deleted, instead of removing it from the DOM and local storage, move it to the Trash column.
b. Update the local storage to reflect the new state.
Add an event listener to the "Trash" link in the left sidebar:
a. When the link is clicked, toggle the visibility of the Trash column.
b. Update the UI to show the Trash column as active.
Create a new function to handle the permanent deletion of tasks from the trash:
a. Add a "delete permanently" icon to the tasks in the Trash column.
b. Attach an event listener to the icon.
c. In the event handler, remove the task from the DOM and local storage, then update the task counters and related UI elements.
Update the local-storage.js module to handle tasks in the Trash column when saving and loading data.

// add a popup warning once trash icon is pressed within the trash column, saying do you want to perm delete?

----------------------------------------


----------------------------------------

//Next Step is create the dispaly look for the appendages



// add counter for sidenavbar on tag counts
// Have the offcanvas grab the information from the selected Cards and also transfer the new values in
// Want to add calender view, will use fullcalender lib



// Using FullCalender Library, Date FNS library, sortableJS library

Features Finished
// Draggable between eachother as well as each column
// Feat: Add counter on each column representing total tasks
// Feat: Blue indicator for completed tasks, and listens for on drop.
// Feat: Tags and Tag Counters


Bugs:
Bug with date feature not showing correctly for Default tasks (not a big deal, since new tasks are by new date())

TODO: 
- Finish the additional Details display (possibly add feature sorting by tags..)
- Calender View with Tasks appended
- Trash feature
- Maybe list of completed in a linear format (between date creation and completed status)
- Finish the aesthetic styling