import { Pipe } from "@angular/core";
import { Employee } from "../model/employee.model";

@Pipe({
    name: "filter",
    pure: true
})
export class FilterPipe {
    transform(employee: Employee[] | undefined, catagory: string | undefined): Employee[] {

        if (employee == undefined) {
            return [];
        }

        return catagory == "all" ?
            employee : employee.filter((e) => e.department == catagory);
    }
}