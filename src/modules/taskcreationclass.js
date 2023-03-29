import { format, formatDistanceToNow, subMonths, parse } from "date-fns";

class TaskCreation {
  constructor(
    title,
    description,
    dateString,
    tags = [],
    priority,
    add,
    content = ""
  ) {
    console.log('dateString:', dateString);
    console.log('this.date before:', this.date);
  
    if (dateString && !isNaN(parse(dateString, 'yyyy-MM-dd', new Date()))) {
      this.date = parse(dateString, 'yyyy-MM-dd', new Date());
    } else {
      this.date = subMonths(new Date(), 1);
    }
  
    console.log('this.date after:', this.date);
  
    this.id = new Date().getTime().toString(); // generate task ID using timestamp
    this.title = title;
    this.description = description;
    this.tags = tags || [];
    this.priority = priority || 1;
    this.add = add || false;
    this.completed = false;
    this.content = content;
  }
  
  formattedCreatedDate() {
    const currentDate = new Date();
    const distance = formatDistanceToNow(this.date, { addSuffix: true });
    return `${distance} (${format(this.date, 'yyyy-MM-dd')})`;
  }
  
}

export default TaskCreation;
