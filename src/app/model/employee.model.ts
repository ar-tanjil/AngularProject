export class Employee {
    constructor(
        public id?: string,
        public name?: string,
        public department?: string,
        public designation?: string,
        public gender?: string,
        public role?: string,
        public isactive?: boolean,
        public password?: string,
        public salary?: number,
        public joinDate?: Date,
    ) { }
}