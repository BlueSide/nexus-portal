import { NgModule }             from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './projects/project/project.component';
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
        {
        path: 'projects/:id',
        component: ProjectComponent
    },
    ]
}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes)
    ],
    declarations: [
        AdminComponent,
        ProjectsComponent,
        UsersComponent
    ]
})
export class AdminRoutingModule { }
