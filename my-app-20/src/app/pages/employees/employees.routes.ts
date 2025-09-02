import { Routes } from "@angular/router";
import { EmployeeList } from "./employee-list/employee-list";
import { EditEmployee } from "./edit-employee/edit-employee";
import { CreateEmployee } from "./create-employee/create-employee";
import { EmployeeDetails } from "./employee-details/employee-details";

export const routes: Routes = [
    { path: 'list', component: EmployeeList },
    { path: 'details/:id', component: EmployeeDetails },
    { path: 'create', component: CreateEmployee },
    { path: 'edit', component: EditEmployee },
];