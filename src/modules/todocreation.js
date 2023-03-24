"use strict";

import { format } from 'date-fns';


const now = new Date();
const formattedDate = format(now, 'yyyy-MM-dd');
console.log(formattedDate);



class Resource {
    constructor(title, description, date, tags, priority, add) {
      this.title = title;
      this.description = description;
      this.date = date || "";
      this.tags = tags || [];
      this.priority = priority || 1;
      this.add = add || false;
    }
  }

//   Gonna be located in a new window pop up (blur background)
// With a Create New (title) and an Close out box top right

// Task Title
// Description
// Due Date
// Tags (Max 5)
// Priority
// Add
  

