import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProjectService } from '../project.service';
import { UserService } from '../../users/user.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent
{
    // TODO: Loaders
    private id: number;

    public loading: boolean;
    public loadingUsers: boolean;
    
    public users: any[];
    public selectedUser: any;
    public project: any = {};
    public projectForm = this.formBuilder.group({
        name: [''],
        authorityName: [''],
        uri: [''],
        user: ['']
    });
    
    constructor(private router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private projectService: ProjectService,
                private userService: UserService)
    {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.refresh();
    }

    public refresh(): void
    {
        this.loading = true;
        this.projectService.getProject(this.id).subscribe((result) => {
            this.projectForm.patchValue(result);
            this.project = result;
            this.loading = false;
        });

        this.loadingUsers = true;
        this.userService.getUsers().subscribe((result) => {
            this.users = result;
            this.selectedUser = this.users[0].username;
            this.loadingUsers = false;
        });
    }

    public save(): void
    {
        this.projectService.saveProject(this.id, this.projectForm.value).subscribe((result) => {
            this.router.navigate(['admin/projects']);
        });
        
    }

    public addUser(): void
    {
        this.projectService.addUser(this.id, this.selectedUser).subscribe((result) => {
            this.refresh();
        });
    }

    public removeUser(username: string): void
    {
        this.projectService.removeUser(this.id, username).subscribe((result) => {
            this.refresh();
        });
    }

    public deleteProject(): void
    {
        UIkit.modal.confirm('UIkit confirm!').then( () => {
            
            this.projectService.deleteProject(this.id).subscribe(() => {
                this.router.navigate(['admin/projects']);
            });
            
        }, () => {
            // Do nothing on cancel
        });
    }

    public cancel(): void
    {
        this.router.navigate(['admin/projects']);                                                                 
    }

}
