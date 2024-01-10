
import './normalize.css'
import './style.css';
import dayjs from 'dayjs'
import ToDo from './class.js'


const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteProjectButton = document.querySelector('[data-delete-project-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskName = document.querySelector('[data-new-task-name]')
const newTaskDate = document.querySelector('[data-new-task-date]')
const newTaskPriority = document.querySelector('[data-new-task-priority]')
const newTaskDesc = document.querySelector('[data-new-task-description ]')
const clearCompletedTask = document.querySelector('[data-deleteCompletedTask]')
const todaysTasks = document.querySelector('[data-tasks-today]')
const upcomingTasks = document.querySelector('[data-upcoming-task]')

const LOCAL_STORAGE_PROJECT_KEY = 'task.projects';
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'task.selectedListId'
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [{id: '1', name: 'My List', tasks: []}];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)

const modal = document.querySelector('#myModal')
const span = document.querySelector('.close')

const pId = document.querySelector('#pId')
const pDate = document.querySelector('#pDate')
const pPriority = document.querySelector('#pPriority')
const pDescription =document.querySelector('#pDescription')



saveAndRender()
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }



todaysTasks.addEventListener('click', () => renderTasksToday())

upcomingTasks.addEventListener('click', () => renderAllTasks()) 

listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedProjectId = e.target.dataset.projectId
        saveAndRender()
    }
})

tasksContainer.addEventListener('click', e=> {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedProject = projects.find(project => project.id === selectedProjectId)
        const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id)
        
        selectedTask.complete = e.target.checked
        saveAndRender()
    }
    if (e.target.tagName.toLowerCase() === 'button') {        
        modal.style.display = 'block'
        const selectedProject = projects.find(project => project.id === selectedProjectId)
        const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id)
       renderModal(selectedTask)
    }
})

span.addEventListener('click', () => modal.style.display = 'none')

deleteProjectButton.addEventListener('click', e => {
    projects = projects.filter(project => project.id !== selectedProjectId)
    selectedProjectId = null
    saveAndRender()
})

clearCompletedTask.addEventListener('click', e=> {
    const selectedProject = projects.find(project => project.id === selectedProjectId)
    selectedProject.tasks = selectedProject.tasks.filter(task => !task.complete)
    saveAndRender()
})

newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const projectName = newListInput.value
    if (projectName == null || projectName === '') return
    const project = createProject(projectName)
    newListInput.value = null
    projects.push(project)
    saveAndRender()

});

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const TaskName = newTaskName.value
    const TaskDate = newTaskDate.value
    const TaskPriority = newTaskPriority.value
    const TaskDesc = newTaskDesc.value
    const today =dayjs()
    const Task = new ToDo(TaskName, TaskDesc, TaskDate, TaskPriority);
    console.log(Task)
    newListInput.value = null
    const selectedList = projects.find(project => project.id === selectedProjectId)
    selectedList.tasks.push(Task)
    newTaskName.value = null    
    newTaskPriority.value = null
    newTaskDate.value = today
    newTaskDesc.value = null
    
    saveAndRender()

});

function createProject(name) {
    return { id: Date.now().toString(), name: name, tasks: []}      
}

function saveAndRender() {
    save()
    render()
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId) 
}


function render() {
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

function renderModal(selectedTask) { 

    pId.textContent = `Title: ${selectedTask.title}`
    pDate.textContent = `Due Date: ${selectedTask.dueDate},`
    pPriority.textContent =`Priority: ${selectedTask.priority}`
    pDescription.textContent = `Description: ${selectedTask.description}`


}

function renderAllTasks() {
    const currentDate = dayjs();
const formattedDate = currentDate.format('YYYY-MM-DD');
console.log(formattedDate);
    
    clearElement(tasksContainer)
    projects.forEach(project => renderTasks(project))
}

function renderTasksToday() {


    clearElement(tasksContainer)
    listTitleElement.innerText = "Today"
    projects.forEach(project => project.tasks.forEach(task => {
        const currentDate = dayjs();
        const formattedDate = currentDate.format('YYYY-MM-DD');
     if (task.dueDate === formattedDate)   {const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.title)
        const dateSpan = taskElement.querySelector('[data-span-task]')
        dateSpan.innerText = task.dueDate
        const details = taskElement.querySelector('.details')
        details.innerText ='details'        
        const priority = taskElement.querySelector('.priority')
        priority.append(task.priority)

        tasksContainer.appendChild(taskElement)}
        else console.log('no object')
    }))
}




function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true)        
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.title)
        const dateSpan = taskElement.querySelector('[data-span-task]')
        dateSpan.innerText = task.dueDate
        const details = taskElement.querySelector('.details')
        details.id = task.id
        details.innerText ='details'        
        const priority = taskElement.querySelector('.priority')
        if (task.priority == 'low') {
            priority.classList.add('low')
        } else if (task.priority == 'medium') {
            priority.classList.add('medium')
        }  else if (task.priority == 'high') {
            priority.classList.add('high')
        }
    
        priority.append(task.priority)

        tasksContainer.appendChild(taskElement)
    })
}


function renderProjects() {
    projects.forEach(project => {        
        const listElement = document.createElement('li')
        listElement.dataset.projectId = project.id
        listElement.classList.add('project')
        listElement.innerText = project.name
        if (project.id === selectedProjectId) {
            listElement.classList.add('active-project')
        }
        listsContainer.appendChild(listElement)
        
        })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    };
};

render();




















