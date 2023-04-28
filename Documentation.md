
# To Do App

The ToDo App is an efficient task manager with drag-and-drop, color-coded priorities, tag tracking, and filtering. It offers a calendar view, responsive design, and local storage, utilizing libraries like Date FNS, FullCalendar, and SortableJS.

## Installation and Setup

Follow these steps to install and set up the ToDo app:

1. Clone the repository:
git clone https://github.com/HyunCafe/odin-todoapp.git

Navigate to the project directory:
```
cd odin-todoapp
```

Install the required dependencies:
```
npm install
```

Build the project:
```
npm run build
```

Start the development server:
```
npm start
```

Open your browser and navigate to http://localhost:8080 to view the ToDo app.

## Project Overview

The structure of the ToDo app is organized as follows:

odin-todoapp/
* ├── index.html # main HTML file
* ├── index.js # main JavaScript file
* ├── styles.css # main CSS file
* ├── modules/ # directory for all the JS modules
* │ ├── calender.js # module for displaying tasks in a calendar view
* │ ├── default-tasks.js # module for storing default tasks
* │ ├── dom-manipulation.js # module for manipulating the DOM
* │ ├── expanded-card-details.js # module for showing expanded task details
* │ ├── filter-tasks.js # module for filtering tasks
* │ ├── local-storage.js # module for managing local storage
* │ ├── sorting.js # module for sorting tasks
* │ ├── tagtracker.js # module for tracking tags
* │ ├── taskcreationclass.js # module for creating task objects
* │ └── trash-display.js # module for displaying the trash column
* └── webpack.config.js # Webpack configuration file

### Default Tasks Module
This module provides the default tasks for the Kanban board and initializes the tasks if none are found in the local storage.

Overview
*  import { WebStorageAPI } from "./local-storage";: The module imports the WebStorageAPI from the local-storage module.
*  const defaultTasks: An object containing the default tasks for the Kanban board. The object has the following structure:
    * todo: An array of tasks in the "To Do" column.
    * in-progress: An array of tasks in the "In Progress" column.
    * completed: An array of tasks in the "Completed" column.
    * trash: An array of tasks in the "Trash" column.

Each task in the arrays is represented as an object with the following properties:
*  taskId: A unique identifier for the task.
*  title: The title of the task.
*  description: The description of the task.
*  dueDate: The due date of the task.
*  tags: The tags associated with the task.
*  priority: The priority of the task.
*  add: A boolean flag to indicate if the task should be added to the board.
*  let Tasks = WebStorageAPI.load();: The module loads the tasks from the local storage using the WebStorageAPI.
*  if (!Tasks) {...}: If no tasks are found in the local storage, the module sets the tasks to the defaultTasks object and saves them to the local storage using the WebStorageAPI.save() method.

### Task Creation Module
This module provides a utility to generate task IDs and includes a class for creating Task objects.

Functions and Class:
*  generateTaskId(): Generates a unique task identifier based on the current timestamp.
*  TaskCreation: A class used to create Task objects with the following properties:
    * taskId: A unique identifier for the task.
    * title: The title of the task.
    * description: The description of the task.
    * tags: An array of tags associated with the task.
    * priority: The priority of the task (default is 1).
    * add: A boolean flag to indicate if the task should be added to the board (default is false).
    * content: The content of the task (default is an empty string).
    * dueDate: The due date of the task (default is null).
    * strikethrough: Shows completed tasks striking through the text.
*  createTaskFromObject(task): A utility function that creates a new Task object from a given task object.

### Tag Tracking Module
This module provides utilities for counting, sorting, and displaying tags in the application.

Functions:
*  countTags(columns): Counts the tags present in each column and returns an object with the tag count.
*  sortTagCount(tagCount): Sorts the tag count object in descending order based on the count.
*  tagTracker(): Loads the tasks from the local storage, counts the tags, and sorts them.
*  updateTagDisplay(sortedTagCount, maxTags = 7): Updates the display of the tags in the sidebar, displaying the top maxTags (default is 7) sorted tags.

### Sortable Columns Module
This module initializes and manages the sortable columns (To Do, In Progress, and Completed) for the Kanban board. It uses the Sortable.js library to enable the dragging and dropping of tasks between columns. It also updates the task counters displayed in the column titles and saves the updated tasks to local storage.

Objects and Variables:
*  columns: An object containing references to the DOM elements of the three main columns (To Do, In Progress, and Completed).
*  columnsCount: An object containing references to the DOM elements for the task counters in the column titles.
*  sortableOptions: An object containing options for the Sortable.js library, including a callback function for updating task counters and saving the updated tasks to local storage.
*  sortableColumns: An object containing instances of Sortable.js for each of the three main columns, initialized with the sortableOptions.
Functions:
*  updateTaskCounters(): Updates the task counters displayed in the column titles. It iterates over each column and calculates the task count based on the number of task containers within the column. It then updates the text content of the respective columnCount DOM element.

Exports:
*  columns: The object containing references to the DOM elements of the three main columns.
*  updateTaskCounters: The function responsible for updating the task counters in the column titles.

### Expanded Card Details Module
This module manages the expanded card details view for tasks in the Kanban board. It includes a class for creating ExpandedCardDetails objects, utility functions for retrieving task data, and methods for populating and updating the expanded card view.

Classes:
*  ExpandedCardDetails: A class used to manage the expanded card details view for a task, including populating form fields and saving changes to the task data. The class includes methods for getting and setting the title, priority, due date, tags, and description of the task.
Functions:
*  getTaskDataById(taskId): Retrieves the task data object for a given taskId from the Kanban board stored in local storage.
*  openExpandedCard(): Opens the expanded card view by sliding it into view and applying a backdrop overlay to the main content.
*  closeExpandedCard(): Closes the expanded card view by sliding it out of view and removing the backdrop overlay from the main content.

Exports:
*  getTaskDataById: The utility function for retrieving task data by taskId.
*  ExpandedCardDetails: The class for managing expanded card details.
*  openExpandedCard: The function for opening the expanded card view.
*  closeExpandedCard: The function for closing the expanded card view.

### Dom Manipulation Module
This JavaScript module is part of a Kanban Board application. It contains functions to create, update, and display tasks on the board, as well as to handle events related to tasks, such as checkbox and trash icon clicks.

Functions:
*  getTaskColumn(columnName: string): Helper function that returns the appropriate column element based on the provided column name.
*  createTaskElementHTML(taskCard: object, strikethrough: boolean): Function that creates the HTML structure for a new task element based on the given task card object and strikethrough status.
*  appendTaskToColumn(taskCard: object, columnName: string): Function to append a task to a specified column on the Kanban board.
*  updateTaskPriorityClass(taskElement: HTMLElement, priority: string): Function to update the priority class of a task element.
*  updateTaskDisplay(filteredTasks: object): Function to update the display of tasks on the board based on the provided filtered tasks object.
*  createNewTask(taskData: object): Function to create a new task object with the given task data.
*  handleCheckboxClick(taskElement: HTMLElement, taskId: string): Function to handle the checkbox click event for a task element.
*  handleCheckboxIconClick(event: Event): Function to handle the checkbox icon click event.
*  handleGlobalClick(event: Event): Function to handle global click events in the document.
*  handleTaskContainerClick(event: Event): Function to handle click events on the task container.
*  saveButtonHandler(): Function to handle the save button click event when editing a task.

Event listeners:
*  mainContainer.addEventListener("click", event => {...}): Event listener for click events on the main container to create and append a new task to a column.
*  document.addEventListener("click", handleGlobalClick): Event listener for global click events in the document to handle task container clicks, checkbox icon clicks, and trash icon clicks.

Usage
The Task Management module is used to manage tasks in a Kanban board application. It provides functions to create, update, and delete tasks, as well as handling user interactions such as clicking on checkboxes, task containers, and saving changes.

### Filter Tasks Module
This JavaScript module is responsible for filtering tasks based on their due dates and switching between the Calendar view and Tasks view.

Functions
filterTasksByDueDate(dateFilter)
*  Arguments
    * dateFilter (string): A string representing the filter to apply, either "today" or "next7Days".
*  Description
    * Filters tasks in each column based on the given dateFilter. If the dateFilter is "today", tasks with due dates on or before the current date are included in the filtered tasks. If the dateFilter is "next7Days", tasks with due dates within the next 7 days are included in the filtered tasks. The function skips the "trash" column while filtering tasks.
*  Returns
    * A filtered tasks object containing tasks filtered based on the dateFilter for each column.

applyFilter(filter)
*  Arguments
    * filter (string): A string representing the filter to apply. It can be "all", "today", "next7Days", or "calendar".
*  Description
    * Applies the filter specified by the filter argument. If the filter is "calendar", the function hides the tasks view, displays the calendar view, and renders the calendar with all tasks. If the filter is "all", "today", or "next7Days", the function displays the tasks view, hides the calendar view, and updates the task display with the filtered tasks based on the filter argument.
*  Returns
    * None.
The applyFilter function is the main entry point for this module, allowing the application to display tasks or calendar views based on the specified filter.


### Trash Display Module
This JavaScript module is responsible for handling the display and hiding of the trash popup when the trash icon is clicked.

Functions
trashDisplay(event)
*  Arguments
    * event (Event): The event object representing the triggering event.
*  Description
    * The function adds an event listener to the trash icon. When the icon is clicked, it toggles the display of the trash popup and the main content's pointer events. It also adds or removes a "popup-active" class to the body element to activate or deactivate the backdrop overlay. If the user clicks anywhere outside of the trash icon, trash column, or any of the task card trash icons, the trash popup is hidden and the pointer events are re-enabled for the main content.
*  Returns
    * None.

The trashDisplay function is the main entry point for this module, providing functionality to manage the visibility of the trash popup and handle click events both inside and outside of the trash popup area.

### Local Storage Module
This JavaScript module manages the local storage and columns for the Kanban board application.

Variables
columns
*  A variable that holds the columns of the Kanban board.

Functions
getColumns()
*  Arguments
    * None.
*  Description
    * The function retrieves the columns from the main container and the trash container, and stores them in the columns variable. It returns the columns object, which contains the column names as keys and the corresponding column elements as values.
*  Returns
    * An object representing the columns of the Kanban board.
WebStorageAPI
*  An object that exposes two methods for interacting with local storage:
    * load(): Loads the Kanban board data from local storage. If no data is found, it returns the default tasks.
    * save(kanbanBoard): Saves the provided Kanban board data to local storage.
updateTasks()
*  Arguments
    * None.
*  Description
    * The function updates the tasks in local storage. It iterates through the columns and retrieves the task elements in each column. For each task element, it creates a task object with the necessary properties and adds it to the corresponding column in the tasks object. Finally, it returns the updated tasks object.
*  Returns
    * An object representing the updated tasks for each column in the Kanban board.


### Calender Module
This JavaScript module manages the calendar display and functionality for the Kanban board application using the FullCalendar library.

Variables
calendarEl
*  A reference to the HTML element with the ID "calendar-view".
switchToCalendarBtn
*  A reference to the HTML element with the ID "calenderFilter".
Functions

getAllTasks()
*  Arguments
    * None.
*  Description
    * The function calls updateTasks() to retrieve the tasks for all columns, and then concatenates them into a single array.
*  Returns
    * An array containing all tasks from the Kanban board.

calenderDisplay()
*  Arguments
    * None.
*  Description
    * The function initializes and renders the calendar using the FullCalendar library. It exports a utility object with two methods: renderCalendar() and getButton().
*  Returns
    * An object containing the methods renderCalendar() and getButton().
getButton()
*  Arguments
    * None.
*  Description
    * The function returns the switchToCalendarBtn reference.
*  Returns
    * A reference to the switch to calendar button.

parseEvents(tasksArray)
*  Arguments
    * tasksArray (Array): An array of tasks to be converted into events.
*  Description
    * The function maps the given tasks array into an array of events with the required properties for the FullCalendar library.
*  Returns
    * An array of events compatible with the FullCalendar library.

renderCalendar(tasksArray)
*  Arguments
    * tasksArray (Array): An array of tasks to be displayed on the calendar.
*  Description
    * The function creates a new FullCalendar instance with the necessary configurations and renders it using the provided tasks array.
*  Returns
    * None.