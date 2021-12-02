"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInfo() {
        console.log(`Total employees count: ${this.employees.length}`);
        console.log(this.employees);
    }
}
Department.financialYear = new Date().getFullYear();
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log(`IT Department - ID: ${this.id}`);
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }
    set mostRecentReport(value) {
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
        return this.instance;
    }
    describe() {
        console.log(`IT Department - ID: ${this.id}`);
    }
    addEmployee(name) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(`Printed Reports: `, this.reports);
        console.log(`Last Report: `, this.lastReport);
    }
}
const accountingDepartment = AccountingDepartment.getInstance();
accountingDepartment.addReport('Something went wrong...');
accountingDepartment.addEmployee('Max');
accountingDepartment.addEmployee('Dan');
accountingDepartment.printEmployeeInfo();
console.log(accountingDepartment.mostRecentReport);
accountingDepartment.mostRecentReport = 'End Year Report';
accountingDepartment.printReports();
const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.financialYear);
const IT = new ITDepartment('d1', ['Dylan']);
IT.describe();
