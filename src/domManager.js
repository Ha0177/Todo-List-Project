import { Task } from "./taskManager.js";
import { Project, ProjectManager } from "./projectManager.js";
import defaultProjectIcon from "./Project-icons/whiteProjectIcon.svg";
import blueProjectIcon from "./Project-icons/blueProjectIcon.svg"
import redProjectIcon from "./Project-icons/redProjectIcon.svg"
import yellowProjectIcon from "./Project-icons/yellowProjectIcon.svg"
import greenProjectIcon from "./Project-icons/greenProjectIcon.svg"
import purpleProjectIcon from "./Project-icons/purpleProjectIcon.svg"
import dateIcon from "./calendar.svg"
import p1Check from "./Task-icons/p1Check.svg"
import p2Check from "./Task-icons/p2Check.svg"
import p3Check from "./Task-icons/p3Check.svg"
import p4Check from "./Task-icons/p4Check.svg"
import deleteProjectIcon from "./deleteProjectIcon.svg"
import deleteTaskIcon from "./trash.svg"
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
        
        // EXAMPLE:
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
        if (options.value) {
            element.value = options.value;
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

    //Project Handler
    
    renderProjects();

    const addProjectBtn = Dom.selectElement(".add-project-btn");
    const addProjectDialog = Dom.selectElement("#add-project-dialog")   
    const addProjectForm = Dom.selectElement("#add-project-form")
    const projectFormCancelBtn = Dom.selectElement("#project-form-cancel-btn");
    const projectFormAddBtn = Dom.selectElement("#project-form-add-btn");

    function renderProjects() {
        const projectsContainer = Dom.selectElement("div.projects-container")
        projectsContainer.textContent = "";

        const currentProjectDisplay = Dom.selectElement(".task-area-project-name");
        currentProjectDisplay.textContent = `My projects/${ProjectManager.currentProject.name}`;
        
        ProjectManager.projects.forEach((project) => {
            const projectLink = Dom.createElement("a", {
                class: "project-link"
            })

            let selectedIconColor
            switch (project.color) {
                case "white":
                    selectedIconColor = defaultProjectIcon;
                     break;
                case "red":
                    selectedIconColor = redProjectIcon;
                    break;
                case "blue":
                    selectedIconColor = blueProjectIcon;
                    break;
                case "green":
                    selectedIconColor = greenProjectIcon;
                    break;
                case "yellow":
                    selectedIconColor = yellowProjectIcon;
                    break;
                case "purple":
                    selectedIconColor = purpleProjectIcon;
                    break;
                default:
                    selectedIconColor = defaultProjectIcon;
                    break;
            }
                
            const projectLinkIcon = Dom.createElement("img", {
                class: "project-link-icon",
                attributes: {
                    src: selectedIconColor
                }
            })
            const projectLinkName = Dom.createElement("span", {
                class: "project-link-name",
                textContent: project.name,
            });
            
            projectLink.addEventListener("click", (e) => {
            e.preventDefault(); 
            ProjectManager.currentProject = project;
            currentProjectDisplay.textContent = `My projects/${ProjectManager.currentProject.name}`;
        });

            const projectCounter = Dom.selectElement(".project-counter")
            projectCounter.textContent = `(${ProjectManager.projects.length}/5)`;

            projectsContainer.appendChild(projectLink);
            projectLink.prepend(projectLinkName);
            projectLink.prepend(projectLinkIcon);

             if (project !== ProjectManager.defaultProject) {
               const projectLinkDeleteBtn = Dom.createElement("button", {
                    class: "project-link-delete-btn"
                });
                const projectLinkDeleteIcon = Dom.createElement("img", {
                    class: "project-link-delete-icon",
                    attributes: {
                        src: deleteProjectIcon
                    }
                });
                projectLinkDeleteBtn.addEventListener("click", (e) =>  {
                    e.stopPropagation();

                    ProjectManager.removeProject(project.name);
                    renderProjects();
                });
                projectLink.appendChild(projectLinkDeleteBtn);
                projectLinkDeleteBtn.appendChild(projectLinkDeleteIcon);
            } 
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
        const colorSelect = Dom.selectElement("#project-color");

        
        if (name.value !== "") {
            ProjectManager.addProject(name.value, colorSelect.value);
        }
        addProjectForm.reset();
        addProjectDialog.close();
        renderProjects();
    });

    // Task handler
    
    const addTaskBtn = Dom.selectElement(".add-task-btn");
    const addTaskDialog = Dom.selectElement("#add-task-dialog");
    const addTaskForm = Dom.selectElement("#add-task-form");
    const taskFormCancelBtn = Dom.selectElement("#task-form-cancel-btn");
    const taskFormAddBtn = Dom.selectElement("#task-form-add-btn");

    // Task form items
    const title = Dom.selectElement("input#task-name");
    const description = Dom.selectElement("input#task-description");
    const date = Dom.selectElement("input#task-due-date");
    const choosePriority = Dom.selectElement("select#task-priority");
    const chooseProject = Dom.selectElement("select#task-project");
    
    const taskArea = Dom.selectElement(".task-area");
    function renderTasks() {
        ProjectManager.currentProject.tasks.forEach((task) => {
            const taskContainer = Dom.createElement("div", {
                class: "task-container"
            })
            taskArea.appendChild(taskContainer);

            const taskItem = Dom.createElement("div", {
                class: "task-item"
            })
            taskContainer.appendChild(taskItem);

            const taskBtnSection = Dom.createElement("div", {
                class: "task-btn-section"
            })
            taskItem.appendChild(taskBtnSection);

            const completeTaskBtn = Dom.createElement("button", {
                class: "complete-task-btn"
            })

            let checkIconColor;
            switch (task.priority) {
                case "4":
                    completeTaskBtn.classList.add("p4")
                    checkIconColor = p4Check
                    break;
                case "3":
                    completeTaskBtn.classList.add("p3")
                    checkIconColor = p3Check
                    break
                case "2":
                    completeTaskBtn.classList.add("p2")
                    checkIconColor = p2Check
                    break
                case "1":
                    completeTaskBtn.classList.add("p1")
                    checkIconColor = p1Check    
                    break
                default:
                    completeTaskBtn.classList.add("p4")
                    checkIconColor = p4Check
                    break;
            }
            taskBtnSection.appendChild(completeTaskBtn);
            
            const checkBtnImg = Dom.createElement("img", {
                class: "check-btn-img",
                attributes: {
                    src: checkIconColor
                }
            })
            completeTaskBtn.appendChild(checkBtnImg);
            
            const taskInfoSection = Dom.createElement("div", {
                class: "task-info-section"
            })
            taskItem.appendChild(taskInfoSection);

            const taskTitleElement = Dom.createElement("h1", {
                class: "task-title",
                textContent: task.title
            })
            taskInfoSection.appendChild(taskTitleElement);

            const taskDescriptionElement = Dom.createElement("p", {
                class: "task-description",
                textContent: task.description 
            })
            if (taskDescriptionElement.textContent !== "") {
                taskInfoSection.appendChild(taskDescriptionElement);
            }

            const taskInfoContainer = Dom.createElement("div", {
                class: "task-info-container" 
            })
            if (task.dueDate) {
            taskInfoSection.appendChild(taskInfoContainer);

            const dateContainer = Dom.createElement("div", {
                class: "date-container"
            })
                taskInfoContainer.appendChild(dateContainer);

            const calendarImg = Dom.createElement("img", {
                attributes: {
                    src: dateIcon
                }
            })
            dateContainer.appendChild(calendarImg);

            const dateDisplay = Dom.createElement("span", {
                class: "date-display",
                textContent: task.dueDate
            })
            dateContainer.appendChild(dateDisplay);
            }
            
            if (task.project.name !== "Inbox") {
                const taskProjectContainer = Dom.createElement("div", {
                class: "task-project-container"
            })
            taskInfoContainer.appendChild(taskProjectContainer);

            let projectIconColor;
            switch (task.project.color) {
                case "white":
                    projectIconColor = defaultProjectIcon;
                    break;
                case "red":
                    projectIconColor = redProjectIcon;
                    break;
                case "blue":
                    projectIconColor = blueProjectIcon;
                    break;
                case "green":
                    projectIconColor = greenProjectIcon;
                    break;
                case "yellow":
                    projectIconColor = yellowProjectIcon;
                    break;
                case "purple":
                    projectIconColor = purpleProjectIcon;
                    break;
            }
            const taskProjectIcon = Dom.createElement("img", {
                class: "task-project-icon",
                attributes: {
                    src: projectIconColor
                }
            })
            taskProjectContainer.appendChild(taskProjectIcon)

            const taskProjectDisplay = Dom.createElement("span", {
                class: "project-display"
            })
            taskProjectContainer.appendChild(taskProjectDisplay);
            }
            

            const deleteTaskBtnSection = Dom.createElement("div", {
                class: "task-delete-btn-section"
            })
            taskItem.appendChild(deleteTaskBtnSection);

            const deleteTaskBtn = Dom.createElement("button", {
                class: "delete-task-btn"
            })
            deleteTaskBtnSection.appendChild(deleteTaskBtn);

            const deleteTaskIconElement = Dom.createElement("img", {
                class: "delete-task-icon",
                attributes: {
                    src: deleteTaskIcon
                }
            })
            deleteTaskBtn.appendChild(deleteTaskIconElement);

            






        });
    }

    addTaskBtn.addEventListener("click", () => {
        addTaskDialog.showModal();

        chooseProject.replaceChildren();
        ProjectManager.projects.forEach((project) => {
            const option = Dom.createElement("option", {
                id: "task-project-option",
                value: project.name,
                textContent: project.name
            });
            chooseProject.appendChild(option);
        });
    });

    addTaskDialog.addEventListener("click", (event) => {
        if (event.target === addTaskDialog) {
            addTaskForm.reset();
            addTaskDialog.close();
        }
    });

    taskFormCancelBtn.addEventListener("click", () => {
        addTaskForm.reset(); 
        addTaskDialog.close(); 
     });

    taskFormAddBtn.addEventListener("click", (e) => {
        e.preventDefault();

        let task
        if (title.value !== "") {
            task = new Task(title.value, description.value, date.value, choosePriority.value, chooseProject.value);  
        } else {
            addTaskForm.reset(); 
            addTaskDialog.close();
            return; 
        };
        ProjectManager.projects.forEach((project) => {
            if (task.project === project.name) {
                project.addTask(task);
            }
        });

        renderTasks();
        addTaskForm.reset();
        addTaskDialog.close();
    });
    

}

export { Dom, initDOM };