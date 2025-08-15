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
    static defaultProject = new Project("Default Project", "white");
    static projects = [ProjectManager.defaultProject];

    static addProject(projectName, color) {
        this.projects.push(new Project(projectName, color));
    }

}

console.log(ProjectManager.projects)

export { Project, ProjectManager };