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

/** Project State Class */
class ProjectState {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;

    constructor(public title: string | number, public desc: string | number, public people: number) {
        this.templateElement = document.getElementById('single_project')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('active_projects_list')! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = `active_project_1`;
        this.attach();
        this.renderContent(this.title, this.desc, this.people);
    }

    private renderContent(title: string | number, desc: string | number, people: number) {
        this.element.textContent = `${title} - ${desc} : ${people}`;
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}


/** Project List Class */
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project_list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = `${this.type}_projects`;
        this.attach();
        this.renderContent();
    }

    private renderContent() {
        this.element.querySelector('ul')!.id = `${this.type}_projects_list`;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}

/** Project Input Class */
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project_input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user_input';

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
        this.attach();
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
            console.log(title, desc, people);
            new ProjectState(title, desc, people);
            this.clearInputs();
        }
    }

    @Binding
    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const projectInput = new ProjectInput();
const activeProject = new ProjectList('active');
const finishedProject = new ProjectList('finished');