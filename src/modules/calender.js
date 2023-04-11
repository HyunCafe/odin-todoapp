import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { format } from "date-fns";


const calenderDisplay = () => {
  const calendarEl = document.getElementById("calendar-view");
  const switchToCalendarBtn = document.querySelector("#calendar-view-btn");

  function getButton() {
    return switchToCalendarBtn;
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

export default calenderDisplay;
