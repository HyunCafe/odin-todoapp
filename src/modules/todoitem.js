"use strict";

import { format } from 'date-fns';


const now = new Date();
const formattedDate = format(now, 'yyyy-MM-dd');
console.log(formattedDate);


class ToDoItem {
    constructor(title, description, date, tags = [], priority, add ) {
      this.title = title;
      this.description = description;
      this.date = date || "";
      this.tags = tags || [];
      this.priority = priority || 1;
      this.add = add || false;
      this.completed = false;
    }
  }





export default ToDoItem;


//Next Step is create the dispaly look for the appendages

// Feat: Add counter on each column representing total tasks
// Draggable between eachother as well as each column