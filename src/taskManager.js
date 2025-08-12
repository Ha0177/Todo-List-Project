class Task {
    constructor(title, description, dueDate, priority, project, complete = false, ) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.complete = complete;
        this.id = crypto.randomUUID();
    }
}