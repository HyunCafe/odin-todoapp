# odin-todoapp (15 weeks into my coding journey)

For my TODO App project, I wanted to level up my planning and implementation skills. I started by pseudo-coding the HTML structure first, then figma designing it visually, I also decided to start documenting my brainstorming in a projectapproach.md file, which helped me plan out the project in bullet points with different modules and future features.

To design the app, I drew inspiration from Notion and Trello and used Figma to visualize the app after completing the HTML pseudo-code. Although the project is still ongoing, I'm excited about the progress I've made and how much I've learned about module coding, SOLID principles, and the value of libraries.

### Summary of Key Features:
* 


### Libraries Used:
* (Date FNS)[https://github.com/date-fns/date-fns]
* (FullCalender)[https://github.com/fullcalendar/fullcalendar]
* (SortableJS)[https://github.com/SortableJS/Sortable]


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
Feat: Add color coding to task cards based on priority level
Feat: Implement dynamic task append feature using DOM manipulation in JavaScript
Fix: Resolve pathing issues for Webpack and improve task card styling
Bug: Attempt to fix Webpack environment bug for improved stability and functionality

## Challenges
#### Sort and Drag Challenge
* I was struggling with items being dragged into task containers in my to-do list project. First, I tried limiting the draggable items to only the tasks within each column with the 'draggable: .main__column--tasks' option. But those sneaky little items still managed to sneak into the task containers.

* So, I added an 'onMove' function to the Sortable constructor to check if the destination element of the drag event was a task container. If it was, I told it to 'get lost' by returning false.

* Next, I tried making the entire task container draggable with 'draggable: .task__container' and excluding the task content with the 'filter' option. But that didn't work out as planned.

* I even tried adding the 'group: shared' option to allow items to be dragged between columns. That was cool and all, but it still let items slip into task containers.

* After trying all kinds of solutions, I finally had a "duh" moment and changed the class name of the task container from main__column--tasks to task__container. And voila! The solution was as simple as that. I was chasing my tail for hours, and all I needed was a good old-fashioned name change... at least I got some cardio in.