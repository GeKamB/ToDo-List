
import './normalize.css'
import './style.css';
import { compareAsc, format } from 'date-fns';
import ToDo from './class.js'


const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteProjectButton = document.querySelector('[data-delete-project-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')

const LOCAL_STORAGE_PROJECT_KEY = 'task.projects';
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'task.selectedListId'
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)

listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedProjectId = e.target.dataset.projectId
        saveAndRender()
    }
})

deleteProjectButton.addEventListener('click', e => {
    projects = projects.filter(project => project.id !== selectedProjectId)
    selectedProjectId = null
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

function createProject(name) {
    return { id: Date.now().toString(), name: name, tasks: [{
     id: 'dsfdefwe',
     name: 'Teskkkt',
     priority: 'high',
     complete: false   
    }]}      
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

function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)

        const details = taskElement.querySelector('.details')
        details.innerText ='details'
        const priority = taskElement.querySelector('.priority')
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




const todoes = [];
window.todoes = todoes;




// add new ToDo to desired array (append para.)
function createToDo(title, descritption, dueDate, priority, notes, append) {
    let newToDo = new ToDo(title, descritption, dueDate, priority, notes);
    append.push(newToDo);
    
};

createToDo('ToDo app', 'zrobic to do app',new Date(2023, 10, 17) , '1', '..', todoes);
createToDo('trening', 'zrobic to do app',new Date(2003, 10, 17) , '1', '..', todoes);
createToDo('matematyka', 'zrobic to do app',new Date(2023, 10, 10) , '1', '..', todoes);



let a = new ToDo('ToDo', 'create a ToDo app', new Date(2023, 10, 10), 'high', '');
a.changeTitle = 'dupa';
console.log(a)


todoes.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.dueDate) - new Date(a.dueDate);
  });










