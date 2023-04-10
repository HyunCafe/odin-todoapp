import { WebStorageAPI } from "./local-storage";

export const countTags = (columns) => {
    // console.log("Counting tags from columns:", columns);

    const tagCount = {};
  
    for (const taskList of Object.values(columns)) {
        // console.log("Counting tags from task list:", taskList);

      for (const task of taskList) {
        const tags = task.tags.split("#").filter(tag => tag);
        for (const cleanTag of tags) {
          tagCount[cleanTag] = (tagCount[cleanTag] || 0) + 1;
        }
      }
    }
    return tagCount;
  };
  
  export const sortTagCount = (tagCount) => {
    return Object.fromEntries(Object.entries(tagCount).sort((a, b) => b[1] - a[1]));
  };
  
  export const tagTracker = () => {
    const tasks = WebStorageAPI.load();
    const tagCount = countTags(tasks);
    return sortTagCount(tagCount);
  };
  
  export const updateTagDisplay = (sortedTagCount, maxTags = 7) => {
    const tagContainer = document.querySelector(".sidebar__tags");
    tagContainer.textContent = "";
  
    for (const [tag, count] of Object.entries(sortedTagCount).slice(0, maxTags)) {
      const tagElement = document.createElement("span");
      tagElement.classList.add("tag");
      tagElement.textContent = `${count} ${tag}`;
      tagContainer.append(tagElement);
    }
  };
  