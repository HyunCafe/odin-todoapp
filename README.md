# odin-todoapp (15 weeks into my coding journey)

For my TODO App project, I wanted to level up my planning and implementation skills. I started by pseudo-coding the HTML structure first, then figma designing it visually, I also decided to start documenting my brainstorming in a projectapproach.md file, which helped me plan out the project in bullet points with different modules and future features.

To design the app, I drew inspiration from Notion and Trello and used Figma to visualize the app after completing the HTML pseudo-code. Although the project is still ongoing, I'm excited about the progress I've made and how much I've learned about module coding, SOLID principles, and the value of libraries.

Edit Notes**
Reflecting on My Approach: Looking back at my TODO App project, I recognize that I was exploring different methods of object creation, including a mix of object literals, constructors, and classes. This exploration, while educational, resulted in a lack of streamlining in the project's codebase. With my current understanding and skills, I would now opt for a more uniform approach, specifically using classes throughout. This change would better align with standard practices in real-world scenarios, enhancing the cohesiveness and maintainability of the codebase.

Addressing the Challenges: During the development process, I encountered challenges related to managing imports and exports, a complexity that stemmed from my limited experience and the diverse object creation methods I was experimenting with. The interdependence of data across various functions led to a tightly coupled system, complicating bug tracking and changes implementation. In future projects, my focus will shift towards creating more modular and independent components and centralizing shared data. This approach will help to reduce inter-module dependencies, thereby simplifying the overall code structure and improving the scalability and maintainability of the project.

![Project Animation](/Animation.gif)
<p align="center">
<a href="https://hyuncafe.github.io/odin-todoapp/" target="_blank">Live Link</a>
</p>

### Summary of Key Features:

##### Drag and Drop Functionality:

* Tasks can be dragged and dropped between the three columns (todo, in progress, and completed).
Color-coded Priorities:
* Tasks are color-coded based on their priority level.
* Urgent tasks are marked with a red border, high priority tasks with a yellow border, and low priority tasks with a green border.

##### Completion Color Code:

* When a task is checked off as completed it will be marked with a blue border indicator with text strike-through.
  
##### Tag Tracking:

* Tags can be added to tasks.
* The frequency of tags used across tasks is tracked.
* The top tags are displayed in a sidebar, sorted by frequency.
* The maximum number of tags displayed can be limited by setting a specific value.

##### Filtering and Sorting:

* Users can filter tasks based on due dates

##### Editing:
* Users can create new tasks with a unique identifier, title, description, due date, tags, and priority.
* Task details can be edited, and changes are saved to local storage.

##### Pop-up Task Display:
* The application includes a pop-up display that shows additional information for a task when clicked.

Delete Feature:

* There is a trash feature which shows recently deleted items, and if deleted from trash then removed from local storage.

##### Local Storage Saves:

* The application saves all data to local storage and loads it on subsequent visits.
* The data includes all tasks, columns, tags, and their respective properties.

##### Calendar View:

* Users can switch to a calendar view, which shows tasks on their respective due dates.
* The calendar view supports different display modes, such as month, week, and day views.

##### Responsive Design:

* The application features a responsive design, making it usable across different devices, screen sizes, and orientations.

### Libraries Used:
* [Date FNS](https://github.com/date-fns/date-fns)
* [FullCalender](https://github.com/fullcalendar/fullcalendar)
* [SortableJS](https://github.com/SortableJS/Sortable)

### Detailed Documentation
For a comprehensive documentation of the project, including a thorough explanation of the code, modules, and functionality, please refer to the [documentation.md](./Documentation.md) file in the root directory.


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
* Feat: Added tag feature to append to DOM and display with simple styling
* Updated: README documentation
* Refactor: Discovered duplication bug and refactored default tasks to own module
* Refactor: Removed duplicate code

#### April 2, 2023
* Add: Added simple style and structure for pop up trash, using old code from previous project
* Refactor: Refactored code for completed -> trash movement, color not saved properly; Bug discovered
* Fix: Fixed issue with trash column not saving and loading properly
* Update README.md

#### April 3, 2023
feat: Implement show task details functionality
- Populates task details correctly
- Saves and loads task details
- Bug with complete class for task details needs fixing

#### April 4, 2023
* Fix: Resolve color code issue in additional details
* Refactor: Remove append task feature for alternative approach
* Fix: Address date format bug and reintegrate date-fns library

#### April 5, 2023
* Refactor: Big refactor, reworking logic for storage
* Refactored: Refactored code, might restart logic from square one
* Feat: Created "add task card to column" by button click
* Add: Re-added complete class logic

#### April 6, 2023
* Refactor: Considering re-working logic from scratch due to increasing complexity
* Refactor: Complete refactor of sorting, storage, and task creation, all working as intended
* Feat: Re-added tag count feature in its own module with simplified logic
* Feat: Re-added trash feature working as intended

#### April 7, 2023
* Merge pull request #1 from HyunCafe/new-TestBuild
* Merge pull request #3 from HyunCafe/new-TestBuild 
* Note: Future bug reports will be submitted as tickets for better tracking
* Refactor: Refactor generate ID logic, working on expanded card
* Feat: Re-added populate expanded details on cards working as intended
* Bug: Fix bug where expanded card detail saves are stuck on one card

#### April 8, 2023
* Fix: Fixed issue where save details on edit did not work
* Refactor: Update priority, all working as intended except complete column issues with storage
* Refactor: Refactor addeventlistener to event delegations
* Refactor: Fix issue with event delegation not functioning correctly
* Refactor: Remove redundant code
* Refactor: Going with new feature for complete indicator UI

#### April 9, 2023
* Refactor: Move all DOM related events to DOM module, and further refactored code
* Bug: Investigating slow load performance and issue with trash not saving
* Fix: Fixed issue where trash and columns were being called multiple times, resulting in poor performance

#### April 10, 2023
* Fix: Checkbox feature fixed, event listeners were overriding it
* Refactor: Code refactored, using delegation with a global event listener
* Feat: Sorting feature added, can sort tasks by today, 7 days, or all
* Feat: Styling features finished, added overlay for trash for effect
* Style: Working on styling, added aesthetics
* Add: Strikethrough property added for completed tasks
* Style: Darker gradient added from top to bottom on cover image for better text visibility

#### April 11, 2023
* Ahh...: Learning git rebase and revert
* Merge: Pull request #5 merged from HyunCafe/test1
* Revert: Previous calender logic and styling changes
* Feat: Calender logic and basic styling added
* Fix: View fixed with new container element added

#### April 12, 2023
* Feat: Calender feature styled and functional
* Fix: Bug with priority saving fixed

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

#### Trash saving and Performance Challenge
* I encountered an issue with the task cards' state not being saved correctly when I moved or deleted them. Through debugging with console.trace(), I discovered that my getColumns() function was being called multiple times, leading to performance issues and inconsistent save states. This function was used in various modules for updating, editing, and saving the states of task cards, including the updateTasks() function within local storage.

* Ultimately, solve this issue, I initialized a variable outside the function scope to store the fetched columns object. Within the getColumns() function, I first checked if the variable had a value, returning the cached value immediately without further processing. If the variable was undefined or empty, I then proceeded with the original logic of fetching the columns from the DOM and storing the result in the variable.

* This change reduced the number of times the function was called and improved the performance of the code, ensuring the state of the task cards was saved correctly.


## Future Immprovements, or Different Possible Approaches
* Mobile First: I would have designed this project with Mobile First in mind for best practice (I am now doing this on all future projects)

* Modularize CSS: I would have broken down the styles.css file into smaller files corresponding to specific components or modules, making the CSS easier to maintain and understand.

* Utilize a CSS preprocessor or Framework: Instead of using vanilla CSS, I could have explored using a CSS preprocessor or a framework to take advantage of pre-built templates and improve my workflow.

* Write tests: I should have written more test cases to ensure new features work well with existing ones without causing issues or breaking the application.

* Incorporate a state management library: As the project grows, managing application state can become complex. I would consider using a state management library like Redux or MobX to handle application state more efficiently in the future.
