export function render() {
    clearElement(listsContainer);
    renderProjects()

    const selectedList = projects.find(project => project.id === selectedProjectId)
    if (selectedProjectId == null) {
        listDisplayContainer.style.display = 'none'
    } else {
        listDisplayContainer.style.display = ''
        listTitleElement.innerText = selectedList.name
        clearElement(tasksContainer)
        renderTasks(selectedList)
        
        
    }
    
};
