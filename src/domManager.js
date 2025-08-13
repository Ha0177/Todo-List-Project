import { Task } from "./taskManager.js";
import { Project, ProjectManager } from "./projectManager.js";

class Dom {
    static selectElement(selector) {
        if (typeof selector === "string") {
            return document.querySelector(selector);
        }
    }

    static selectAllElements(selector) {
        if (typeof selector === "string") {
            return document.querySelectorAll(selector)
        }
    }

    static addClass(element, className) {
        if (typeof className === "string") {
            element.classList.add(className);
        }
    }

    static removeClass(element, className) {
        if (typeof className === "string") {
            element.classList.remove(className);
        }
    }

    static createElement(elementName, options = {}) {
        
        // const myButton = Dom.createElement('button', {
        //     class: 'add-btn',
        //     textContent: 'Click Me'
        // });

        const element = document.createElement(elementName);

        if (options.class) {
            element.classList.add(options.class);
        }
        if (options.textContent) {
            element.textContent = options.textContent;
        }
        if (options.id) {
            element.id = options.id;
        }

        return element;
    }
}

function handleAddTaskBtnClick() {
}

function handleAddProjectBtnClick() {
    const addProjectDialog = Dom.selectElement("#add-project-dialog")
    const addProjectForm = Dom.selectElement("#add-project-form")
    addProjectDialog.showModal();

    addProjectDialog.addEventListener("click", (event) => {
        if (event.target === addProjectDialog) {
            addProjectForm.reset();
            addProjectDialog.close();
        }
    });

    const projectFormCancelBtn = Dom.selectElement("#project-form-cancel-btn");
    projectFormCancelBtn.addEventListener("click", () => {
       addProjectForm.reset(); 
       addProjectDialog.close(); 
    });

    const projectFormAddBtn = Dom.selectElement("#project-form-add-btn");
    projectFormAddBtn.addEventListener("click", () => {
        const projectFormInput = Dom.selectElement("input#project-name");
        ProjectManager.addProject(projectFormInput.value);
    })
}

function renderDOM() {
    const addTaskBtn = Dom.selectElement(".add-task-btn");
    addTaskBtn.addEventListener("click", handleAddTaskBtnClick);

    const addProjectBtn = Dom.selectElement(".add-project-btn");
    addProjectBtn.addEventListener("click", handleAddProjectBtnClick);

}

export { Dom, renderDOM };