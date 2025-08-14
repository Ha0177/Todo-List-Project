import { Task } from "./taskManager.js";
import { Project, ProjectManager } from "./projectManager.js";
import hashIcon from "./hash.svg";

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
        if (options.attributes) {
            for (const [attrName, attrValue] of Object.entries(options.attributes)) {
                element.setAttribute(attrName, attrValue);
            }
        }

        return element;
    }
}

function initDOM() {

    renderProjects();

    const addTaskBtn = Dom.selectElement(".add-task-btn");
    addTaskBtn.addEventListener("click", () => {
        
    });

    //Project Handler

    const addProjectBtn = Dom.selectElement(".add-project-btn");
    const addProjectDialog = Dom.selectElement("#add-project-dialog")   
    const addProjectForm = Dom.selectElement("#add-project-form")
    const projectFormCancelBtn = Dom.selectElement("#project-form-cancel-btn");
    const projectFormAddBtn = Dom.selectElement("#project-form-add-btn");

    function renderProjects() {
        const projectsContainer = Dom.selectElement("div.projects-container")
        projectsContainer.textContent = "";
        ProjectManager.projects.forEach((project) => {
            const projectLink = Dom.createElement("a", {
                class: "project-link"
            })
            const projectLinkIcon = Dom.createElement("img", {
                class: "project-link-icon",
                attributes: {
                    src: hashIcon
                }
            })
            const projectLinkName = Dom.createElement("span", {
                class: "project-link-name",
                textContent: project.name,
            });
            
            projectsContainer.appendChild(projectLink);
            projectLink.prepend(projectLinkName);
            projectLink.prepend(projectLinkIcon);
        });
    };

    addProjectBtn.addEventListener("click", () => {
        addProjectDialog.showModal();
    });

    addProjectDialog.addEventListener("click", (event) => {
        if (event.target === addProjectDialog) {
            addProjectForm.reset();
            addProjectDialog.close();
        }
    });

    projectFormCancelBtn.addEventListener("click", () => {
        addProjectForm.reset(); 
        addProjectDialog.close(); 
     });

     projectFormAddBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const name = Dom.selectElement("input#project-name");
        const color = Dom.selectElement("input#project-color")
        if (name.value !== "") {
            ProjectManager.addProject(name.value, color.value);
        }
        addProjectForm.reset();
        addProjectDialog.close();
        renderProjects();
    });


}

export { Dom, initDOM };