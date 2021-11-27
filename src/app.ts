class Department {
    // was moved right to constructor
    // private readonly id: string;
    // private name: string;
    private employees: string[] = [];

    constructor(private readonly id: string, public name: string) {
        // redundant since declared before
        // this.id = id;
        // this.name = n;
    }

    describe(this: Department) {
        console.log(`Department (${this.id}): ${this.name}`);
    }

    addEmployee(employee: string) {
        // since id is readonly - it can be set only once during initialization
        // this.id = 'd2';
        this.employees.push(employee);
    }

    printEmployeeInfo() {
        console.log(`Total employees count: ${this.employees.length}`);
        console.log(this.employees);
    }
}

const accounting = new Department('d1', 'Accounting');
accounting.addEmployee('David');
accounting.addEmployee('Zoey');

// Will not work since property was marked as private
// accounting.employees[2] = 'Anna';

accounting.describe();
accounting.printEmployeeInfo();

// const accountingCopy = { name: 'AccountingCopy', describe: accounting.describe};
// accountingCopy.describe();
