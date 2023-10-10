
import './normalize.css'
import './style.css';
import { compareAsc, format } from 'date-fns'




const todoes = [];
const projects = [];
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
class Project extends ToDo {
    constructor(title, description, dueDate, priority, notes, projectName) {
        super(title, description, dueDate, priority, notes);
        this.projectName = projectName;
    }

    get changeProjectName() {
        return this.projectName;
    }

    set changeProjectName(value) {
        this.projectName = value;
    }
}


function createToDo(title, descritption, dueDate, priority, notes, append) {
    let newToDo = new ToDo(title, descritption, dueDate, priority, notes);
    append.push(newToDo);
    
};

createToDo('ToDo app', 'zrobic to do app',new Date(2023, 10, 17) , '1', '..', todoes);
createToDo('trening', 'zrobic to do app',new Date(2003, 10, 17) , '1', '..', todoes);
createToDo('matematyka', 'zrobic to do app',new Date(2023, 10, 10) , '1', '..', todoes);
let newProject = new Project('punkt 1', 'zrobic to do app', new Date(2023, 10, 17) , '1', 'gowniany Projekt')
console.log(newProject);
console.log(newProject.projectName)



let a = new ToDo('ToDo', 'create a ToDo app', new Date(2023, 10, 10), 'high', '');
a.changeTitle = 'dupa';
console.log(a)


todoes.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.dueDate) - new Date(a.dueDate);
  });
  console.log(todoes);









