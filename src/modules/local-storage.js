export function saveCategories(categories) {
  // Create an array to store the task__container data
  const taskData = [];
  const columns = document.querySelectorAll('.main__column');

  // Convert each task to an object with its properties
  columns.forEach(column => {
    const category = categories.find(category => category.name === column.dataset.category);

    if (category) {
      category.tasks.forEach(task => {
        taskData.push({
          id: task.id,
          title: task.title,
          description: task.description,
          date: task.date,
          tags: task.tags,
          priority: task.priority,
          add: task.add,
          completed: task.completed,
          content: task.content // include the content property
        });
      });
    }
  });

  // Iterate over each category and get its task__containers
  columns.forEach((column) => {
    const taskContainers = column.querySelectorAll('.task__container');

    // Iterate over each task__container and add its data to the taskData array
    taskContainers.forEach((container) => {
      const id = container.getAttribute('data-task-id');
      const taskTitle = container.querySelector('.task__title').textContent;
      const taskDescription = container.querySelector('.task__description').textContent;
      const taskCreatedDate = container.querySelector('.task__created-date').textContent;
      const taskTags = container.querySelector('.task__tags').textContent;
      const contentElement = container.querySelector('.task__content');
      const content = contentElement ? contentElement.textContent : "";

      taskData.push({
        id,
        title: taskTitle,
        description: taskDescription,
        date: taskCreatedDate,
        tags: taskTags,
        priority: 1,
        add: false,
        completed: false,
        content, 
      });
    });
  });

  // Save the task data and categories to local storage
  const taskDataJson = JSON.stringify(taskData);
  window.localStorage.setItem('taskData', taskDataJson);

  const categoriesJson = JSON.stringify(categories);
  window.localStorage.setItem('categories', categoriesJson);
}




export function loadCategories() {
  // Load categories from local storage
  const categoriesJson = window.localStorage.getItem('categories');
  
  // Parse JSON string to object
  const categories = JSON.parse(categoriesJson);

  // Loop through each category and its tasks to create task elements on the page
  categories.forEach(category => {
    const categoryElement = document.querySelector(`.main__column[data-category="${category.name}"]`);
  
    category.tasks.forEach(task => {
      const newTask = new TaskCreation(
        task.title,
        task.description,
        task.date,
        task.tags,
        task.priority,
        task.add
      );
  
      appendTask(newTask, categoryElement);
    });
  });

  // Return categories object
  return categories;
}


export function updateCategory(category, index) {
  // Get existing categories from local storage
  const categories = loadCategories();

  // Update specific category in categories array
  categories[index] = category;

  // Save updated categories to local storage
  saveCategories(categories);
}
