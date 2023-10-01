import './style.css';


const todoes = [];
const projects = [];
window.todoes =todoes;


class ToDo {
    progres = 'in progress'
    constructor(title, desciption, duedate, priority, notes) {
        this.title = title;
        this.desciption = desciption;
        this.duedate = duedate
        this.priority = priority;
        this.notes = notes;
    }
    editProgress() {
        if (this.progres === 'in progress') {
            this.progres = 'completed'
        }
        else  {
            this.progres = 'in progress';            
        }
        
    }
    editTitle(value) {
        this.title = value
    }
    editDescription() {
        this.desciption = value;
    }
    editDate(value) {
        this.date = value
    }
    editPriority(value) {
        this.priority = value
    }
    editNotes(value) {
        this.notes = value
    }

    
}


function createToDo(title, desciption, duedate, priority, notes) {
    let newToDo = new ToDo(title, desciption, duedate, priority, notes);
    todoes.push(newToDo);
    
};
function createProject() {
    let project = []
    projects.push(project)
}
createToDo('to do app', 'zrobic to do app',new Date(2023, 10, 17) , '1', '..');
createToDo('to do app', 'zrobic to do app',new Date(2023, 10, 10) , '1', '..');
createProject()



let a = new ToDo('ToDo', 'create a ToDo app', new Date(2023, 10, 10), 'high', '');
projects[0].push(a)
console.log(projects);





