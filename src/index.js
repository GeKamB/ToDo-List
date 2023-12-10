
import './normalize.css'
import './style.css';
import { compareAsc, format } from 'date-fns'


const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form');
const newListInput = document.querySelector('[data-new-list-input]');



const LOCAL_STORAGE_PROJECT_KEY = 'task.projects';
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'task.selectedListId'
const projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)

listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedProjectId = e.target.dataset.projectId
        saveAndRender()
    }
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
};

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    };
};

render();



//              CLASSES
const todoes = [];
window.todoes = todoes;

class ToDo {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.progress = 'in progress';
    }

    get changeProgress() {
        return this.progress;
    }

    set changeProgress(value) {
        if (value === 'in progress' || value === 'completed') {
            this.progress = value;
        } else {
            console.error('Invalid progress value');
        }
    }

    get changeTitle() {
        return this.title;
    }

    set changeTitle(value) {
        this.title = value;
    }
    get changeDescript() {
        return this.description;
    }

    set changeDescript(value) {
        this.description = value;
    }

    get changeDate() {
        return this.dueDate;
    }

    set changeDate(value) {
        this.dueDate = value;
    }

    get changePriority() {
        return this.priority;
    }

    set changePriority(value) {
        this.priority = value;
    }

    get changeNotes() {
        return this.notes;
    }

    set changeNotes(value) {
        this.notes = value;
    }

 
}


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










