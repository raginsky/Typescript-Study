abstract class Department {
    static financialYear = new Date().getFullYear();
    /**
     * was moved right to constructor
     * private readonly id: string;
     * private name: string;
     * private employees: string[] = [];
     * protected instead of private can be inherit in extended class
     */
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        /**
         * redundant since declared before
         * this.id = id;
         * this.name = n;
         * can be accessed with class name from own constructor:
         * console.log(Department.financialYear);
         */
    }

    static createEmployee(name: string) {
        return {name: name};
    }

    /** Now describe() should be presented in all other class that's extends from here */
    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        /**
         * since id is readonly - it can be set only once during initialization
         * this.id = 'd2';
         */
        this.employees.push(employee);
    }

    printEmployeeInfo() {
        console.log(`Total employees count: ${this.employees.length}`);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }

    describe() {
        console.log(`IT Department - ID: ${this.id}`);
    }
}

class AccountingDepartment extends Department {
    private static instance: AccountingDepartment;
    private lastReport: string;

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    /** getter (method that must return something) */
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    /** setter (must take a value) */
    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance
    }

    describe() {
        console.log(`IT Department - ID: ${this.id}`);
    }

    addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }
        /** can't inherit if private */
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(`Printed Reports: `, this.reports);
        console.log(`Last Report: `, this.lastReport);
    }
}

/**
 * Singleton pattern: Now accessed by static instance since constructor is private:
 * const accountingDepartment = new AccountingDepartment('d2', []);
 * Now instance of this class is restrict to single one:
 */
const accountingDepartment = AccountingDepartment.getInstance();
accountingDepartment.addReport('Something went wrong...');
accountingDepartment.addEmployee('Max');
accountingDepartment.addEmployee('Dan');
accountingDepartment.printEmployeeInfo();

/** getter should be accessed as a normal property */
console.log(accountingDepartment.mostRecentReport);
/**
 * setter, must be accessed as a property
 * this will throw an Error
 * accountingDepartment.mostRecentReport = '';
 */

accountingDepartment.mostRecentReport = 'End Year Report';
accountingDepartment.printReports();

/** static method AND property can be called directly on class without `New` */
const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.financialYear);

const IT = new ITDepartment('d1', ['Dylan']);
IT.describe();

/** Cant be created now because of abstract
 * const accounting = new Department('d1', 'Accounting');
 * accounting.addEmployee('David');
 * accounting.addEmployee('Zoey');
 */

/**
 * Will not work since property was marked as private
 * accounting.employees[2] = 'Anna';
 */

/**
 * const accountingCopy = { name: 'AccountingCopy', describe: accounting.describe};
 * accountingCopy.describe();
 */
