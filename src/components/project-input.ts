/// <reference path="base.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../util/validation.ts"/>
/// <reference path="../state/project-state.ts"/>

namespace App {
    /** Project Input Class */
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

        @binding
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
}