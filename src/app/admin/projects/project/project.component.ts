import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProjectService } from '../project.service';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent
{

    // TODO: Loaders

    
    private id: number;
    private users: any[];
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
                private userService:UserService)
    {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.refresh();
    }

    public refresh(): void
    {
        this.projectService.getProject(this.id).subscribe((result) => {
            this.projectForm.patchValue(result);
            this.project = result;
        });

        this.userService.getUsers().subscribe((result) => {
            this.users = result;
            this.selectedUser = this.users[0].username;
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

    public cancel(): void
    {
        this.router.navigate(['admin/projects']);                                                                 
    }

}
