class Project {
    constructor(name) {
        this.name = name;
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
    static defaultProject = new Project("Default Project");
    static projects = [ProjectManager.defaultProject];

    static addProject(projectName) {
        this.projects.push(new Project(projectName));
    }

}

export { Project, ProjectManager};