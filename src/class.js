
export default class ToDo {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.complete = false;
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