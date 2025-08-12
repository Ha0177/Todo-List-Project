class Task {
    constructor(title, description, dueDate, priority, project, complete = false ) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.complete = complete;
        this.id = crypto.randomUUID();
    }

    setTitle(newTitle) {
        if(typeof newTitle === "string" && newTitle.trim() !== "") {
            this.title = newTitle;
        } else {
            return false;
        }
    }

    setDescription(newDescription) {
        if(typeof newDescription === "string" && newDescription.trim() !== "") {
            this.description = newDescription;
        } else {
            return false;
        }
    }

    setDueDate(newDate) {
        if(typeof newDate === "string" && newDate !== "") {
            this.dueDate = newDate;
        } else {
            return false;
        }
    }

    setPriority(newPriority) {
        if(typeof newPriority === "string" && newPriority !== "") {
            this.priority = newPriority;
        } else {
            return false;
        }
    }

    setProject(newProject) {
        if(typeof newProject === "string" && newProject !== "") {
            this.project = newProject;
        } else {
            return false;
        }
    }

    setComplete() {
        this.complete = !this.complete;
    }
}

export { Task };