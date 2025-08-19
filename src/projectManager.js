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
    static currentProjectValue = null;

    static get defaultProject() {
        return this.projects[0];
    }

    static get currentProject() {
        return this.currentProjectValue || this.defaultProject;
    }

    static set currentProject(project) {
        this.currentProjectValue = project;
    }
    
    static removeProject(projectName) {
        const projectIndex = this.projects.findIndex(project => project.name === projectName)

        if (projectIndex !== -1) {
            const projectToRemove = this.projects[projectIndex];
            this.projects.splice(projectIndex, 1);

            if (this.currentProject === projectToRemove) {
                this.currentProject = this.defaultProject;
            }
        }
    }

    static addProject(projectName, color) {
        if (ProjectManager.projects.length === 5) {
            return;
        } else {
            this.projects.push(new Project(projectName, color));
        }
    } 
}

export { Project, ProjectManager };