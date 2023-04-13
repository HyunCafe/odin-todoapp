import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { updateTasks } from "./local-storage";

export const getAllTasks = () => {
  const tasksObj = updateTasks();
  const allTasks = [].concat(...Object.values(tasksObj));
  return allTasks;
};

export const calenderDisplay = () => {
  const calendarEl = document.getElementById("calendar-view");
  const switchToCalendarBtn = document.querySelector("#calenderFilter");

  function getButton() {
    return switchToCalendarBtn;
  }

  function parseEvents(tasksArray) {
    return tasksArray.map(task => ({
      title: task.title,
      start: task.dueDate,
      allDay: true,
      extendedProps: {
        description: task.description,
        tags: task.tags,
        priority: task.priority,
      },
    }));
  }

  function renderCalendar(tasksArray) {
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialDate: new Date(),
      navLinks: true,
      editable: true,
      dayMaxEvents: true,
      events: parseEvents(tasksArray),
    });
    calendar.render();
  }
  
  const tasks = [ /* an array of tasks */ ]; 
  renderCalendar(tasks);
  
  return { renderCalendar, getButton };
};
