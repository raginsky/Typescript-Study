/** Validation */
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatebleInput: Validatable) {
    let isValid = true;
    if (validatebleInput.required) {
        isValid = isValid && validatebleInput.value.toString().trim().length !== 0;
    }
    if (validatebleInput.minLength != null && typeof validatebleInput.value === 'string') {
        isValid = isValid && validatebleInput.value.length >= validatebleInput.minLength;
    }
    if (validatebleInput.maxLength != null && typeof validatebleInput.value === 'string') {
        isValid = isValid && validatebleInput.value.length <= validatebleInput.maxLength;
    }
    if (validatebleInput.min != null && typeof validatebleInput.value === 'number') {
        isValid = isValid && validatebleInput.value >= validatebleInput.min;
    }
    if (validatebleInput.max != null && typeof validatebleInput.value === 'number') {
        isValid = isValid && validatebleInput.value <= validatebleInput.max;
    }

    return isValid;
}

/** Autobind Decorator */
function Binding(_: any, _2: any, descriptor: PropertyDescriptor) {
    const initMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return initMethod.bind(this);
        }
    }
    return adjDescriptor;
}

/** Project Type Class */
enum ProjectStatus { Active, Finished}

class Project {
    constructor(public id: string,
                public title: string,
                public description: string,
                public people: number,
                public status: ProjectStatus) {

    }
}

/** Project State Class */
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project> {
    private static instance: ProjectState;

    private projects: Project[] = [];

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, desc: string, people: number) {
        const newProject = new Project(Math.random().toString(), title, desc, people, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

/** Component Base Class */
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string,) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    abstract configure(): void;

    abstract renderContent(): void;

    private attach(insertAtBeggining: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeggining ? 'afterbegin' : 'beforeend', this.element);
    }

}

/** Project List Class */
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project_list', 'app', false, `${type}_projects`);
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }

    configure() {
        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.renderProjects();
        });
    }

    renderContent() {
        this.element.querySelector('ul')!.id = `${this.type}_projects_list`;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}_projects_list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }
}

/** Project Input Class */
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project_input', 'app', true, 'user_input');

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
    }

    @Binding
    configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    renderContent() {
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDesc = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descValidatable: Validatable = {
            value: enteredDesc,
            required: true,
            minLength: 4,
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        if (
            !validate(titleValidatable) ||
            !validate(descValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!');
            return;
        } else {
            return [enteredTitle, enteredDesc, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}

/** Project Input Class */
class ProjectItem extends Component<HTMLUListElement, HTMLUListElement> {
    private project: Project;

    constructor(hostId: string, project: Project) {
        super(`single_project`, hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }

    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} persons`;
        }
    }

    configure() {
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

const projectInput = new ProjectInput();
const activeProject = new ProjectList('active');
const finishedProject = new ProjectList('finished');