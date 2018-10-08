import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { AdminGuard } from '../auth/admin.guard';

const adminRoutes: Routes = [
    {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
        {
        path: 'users',
        component: UsersComponent
    },
        {
        path: 'projects',
        component: ProjectsComponent
    },
    ]
}
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    declarations: [
        AdminComponent,
        ProjectsComponent,
        UsersComponent
    ]
})
export class AdminRoutingModule { }
