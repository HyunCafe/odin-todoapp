# odin-todoapp (15 weeks into my coding journey)

For my TODO App project, I wanted to level up my planning and implementation skills. I started by pseudo-coding the HTML structure first, then figma designing it visually, I also decided to start documenting my brainstorming in a projectapproach.md file, which helped me plan out the project in bullet points with different modules and future features.

To design the app, I drew inspiration from Notion and Trello and used Figma to visualize the app after completing the HTML pseudo-code. Although the project is still ongoing, I'm excited about the progress I've made and how much I've learned about module coding, SOLID principles, and the value of libraries.

### Summary of Key Features:
Drag and Drop Functionality:
* Tasks can be dragged and dropped between the three columns (todo, in progress, and completed).

Color-coded Priorities:
* Tasks are color-coded based on their priority level.
* Urgent tasks are marked with a red border, high priority tasks with a yellow border, and low priority tasks with a green border.

Completion Color Code:
* When a task is checked off as completed or moved to the completed column, it changes color to a blue completion color.
* If the task is moved out of the completed column, it reverts to its original priority color.

Tag Tracking:
* Tags can be added to tasks.
* The frequency of tags used across tasks is tracked.
* The top tags are displayed in a sidebar, sorted by frequency.
* The maximum number of tags displayed can be limited by setting a specific value.

Pop-up Task Display:
* The application includes a pop-up display that shows additional information for a task when clicked.

Delete Feature:
* Users can delete individual tasks

Local Storage Saves:
* The application saves all data to local storage and loads it on subsequent visits.
* The data includes all tasks, columns, tags, and their respective properties.

### Libraries Used:
* [Date FNS](https://github.com/date-fns/date-fns)
* [FullCalender](https://github.com/fullcalendar/fullcalendar)
* [SortableJS](https://github.com/SortableJS/Sortable)


## Project Timeline

#### March 24, 2023
* Chore: Setup webpack environment with entry point and plugins
* Add: Added projectapproach.md file to document project planning and thought process
* Update projectapproach.md: Improved layout for easier reading and organization of information
* Add: Added Date FNS external library for working with dates
* Add: Added basic HTML layout with BEM naming convention for improved maintainability
* Add: Reused event listener from a previous project and refactored for new use
* Add: Corrected index.html structure, as previous commit did not properly update it
* Add: Added basic styling for improved aesthetics and user experience
* Fix: Fixed exports for npx --watch functionality to work properly
* Feat: Started working on the todo creation feature, utilizing class structure for improved maintainability
* Add: Added input form and styled it for improved user experience
* Add: Added ToDo class and Task Category modules for improved organization and maintainability
* Add: Added styling to the task cards to further improve user experience and aesthetics

#### March 25, 2023
* Updated Readme

#### March 26, 2023
* Feat: Add color coding to task cards based on priority level
* Feat: Implement dynamic task append feature using DOM manipulation in JavaScript
* Fix: Resolve pathing issues for Webpack and improve task card styling
* Bug: Attempt to fix Webpack environment bug for improved stability and functionality

#### March 27, 2023
* Feat: Added additional details pop up with Notion styling
* Style: Styled the additional detail pop up for a better user experience
* Style: Improved the aesthetics of the application by making the outlines cleaner and adding an active soft blue color
* Feat: Added sort and drag functionality using the SortableJS library for improved task management
* Doc: Updated the progress and timeline documentation

#### March 28, 2023
* Add: Counter for each column to show the number of cards contained
* Add: Saving to local storage for better data persistence
* Fix: Working on issue with saving storage
* Fix: Issue with save function

#### March 29, 2023
* Fix: Fix invalid date bug, wasn't parsing correctly
* Fix: Fix save/load storage, working on date bug again
* Refactor: Remove date FNS formulas for now, to new date for simplicity

#### March 30, 2023
* Add: Added tag count logic to count the number of tags, working as intended
* Refactor: Refactored to arrow syntax for better readability
* Refactor: Refactored code, added feature delete to work correctly
#### March 31, 2023
* Feat: Added blue indicator color change for completed tasks
* Fix: Fixed bug where event of complete sometimes did not trigger
* Add: Fixed the save and local state to account for completed class

#### April 1, 2023


## Challenges
#### Sort and Drag Challenge
* I encountered a problem in my to-do list project where draggable items were being placed into task containers. Initially, I tried to limit draggable items to only the tasks within each column using the 'draggable: .main__column--tasks' option. However, this proved ineffective as the items still managed to find their way into task containers.

* To remedy this, I added an 'onMove' function to the Sortable constructor to check whether the destination element of the drag event was a task container. If it was, I returned false to prevent it from being placed there.

* Subsequently, I attempted to make the entire task container draggable with 'draggable: .task__container' while excluding task content with the 'filter' option, but this did not yield the desired outcome.

* I also tried adding the 'group: shared' option to enable items to be dragged between columns, but it still resulted in draggable items being placed into task containers.

* Finally, after exploring different solutions, I realized that the issue was simply caused by the class name of the task container, which I changed from main__column--tasks to task__container (Since my columns also had that name). This resolved the problem, and the solution was much simpler than I initially thought.

#### Duplication Challenge
* I recently encountered a bug where duplicate tasks were being created every time the page was refreshed. After investigating the issue, I found that the problem was related to tasks being saved in local storage every time they were moved to a different category. This caused the task list to be saved multiple times, leading to duplicates if the same task was moved more than once.

* To solve this problem, I added a check to the loadCategories function to prevent duplicate tasks from being created. The check involved verifying whether a task with the same content (title, description, date, tags, and priority) already existed in the category before adding it. If a task with the same content was found, it was skipped to prevent duplicates.

* After implementing this fix, I tested the application and confirmed that the duplication issue was resolved. 

#### Color Coded Class Change Challenge
*  I aimed to implement a Color Coded Priority change feature for task elements when they were completed or put in the completed column. Initially, I faced issues with event inconsistencies when using both dragstart and dragend events, as they would fire multiple times, making the implementation inefficient. I discovered the drop event listener as an alternative, which seemed to work, but about 10% of the time, it wouldn't trigger, especially when holding task cards for too long before dropping them.

*  After some research, I found solutions that involved adding more event listeners like dragstart, but I felt it wasn't necessary and would introduce extra code. Instead, I decided to replace the drop event with the dragend event and used console.logs to track when events were firing correctly, as well as to check for multiple firings. This simple change to using only the dragend event solved the issue effectively.

#### Completed Class not saving From Completed Column to Trash Column
##### Issue: 
completed tasks were not retaining their priority level when they were deleted from the Completed column and moved to the Trash column. Instead, their priority level was defaulting to "low" in the Trash column.
##### Approach: 
* Checked saving task data to local storage and confirmed correct saving of priority level of completed tasks.
* Checked deleting tasks from local storage and confirmed correct removal.
* Checked loading tasks from local storage and rendering to UI and confirmed correct loading of priority level of completed tasks.
* Suspected issue with deleting completed tasks from Completed column.
* Used console logs to check priority level before and after deletion and confirmed correct state saving.
* Used breakpoints to step through code and identified missing "complete" class in appendTask function.
* Added "complete" class to assign border color based on priority level in appendTask function.
* Tested solution and confirmed issue was resolved.
* Used Chrome debugger and console.log statements to help debug and track variable values.
* Made changes to update saving and loading of new Trash column.

#### Update Submission Called Multiple Times
* The issue I had was that the handleFormSubmit function was being called multiple times when a user clicked on a task element to edit it. This was because the taskClickHandler function was calling the handleFormSubmit function each time a user clicked on a task element to edit it.

* I tried a few solutions, such as removing the event listener on the task element after it was clicked and changing the event listener to use the once option, but neither of these solutions worked.

* The ultimate solution I ended up with was to remove the event listener on the task element inside the handleFormSubmit function. This prevented the function from being called multiple times when a user clicked on a task element to edit it. I also added an if statement to check whether the form had been submitted before running the updateTaskElementInUI function to prevent the function from being called multiple times in a row.

#### Overcoming Code Complexity Modular Approach to Refactoring
* During a recent project, I encountered a challenge that many developers face: code complexity and debugging difficulties. As the project grew in size, it became apparent that I needed to refactor the entire codebase. I approached this by breaking it down into smaller, more manageable modules, and building it back up gradually, informed by the lessons I learned from the first iteration. I meticulously analyzed each module, integrating them incrementally, and thoroughly testing and validating each before proceeding.

* This methodical approach helped me control the complexity, making debugging and management easier. In addition, I was able to significantly reduce the amount of code by several hundred lines, while maintaining the same functionality as before. This not only made the project more manageable but also improved its performance.

* Ultimately, I overcame the challenge by adopting a modular approach, carefully planning, and considering the long-term implications of code complexity. This experience highlighted for me the importance of addressing potential issues early in the development process.