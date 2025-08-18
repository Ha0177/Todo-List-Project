class Project {
    constructor(name, color) {
        this.name = name;
        this.color = color
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskId) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId) 

        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            return true;
        }
        return false;
    }
}

class ProjectManager {
    static projects = [new Project("Inbox", "white")];
    static defaultProject = ProjectManager.projects[0];
    
    static addProject(projectName, color) {
        if (ProjectManager.projects.length === 5) {
            return;
        } else {
            this.projects.push(new Project(projectName, color));
        }
    }

}

console.log(ProjectManager.projects)

export { Project, ProjectManager };