import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService, Project } from './project.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent
{
    public projects: any[] = [];

    @ViewChild('modalElement') modalElement: ElementRef;

    // TODO: Match validators with backend constraints
    public projectForm = this.formBuilder.group({
        name: ['', Validators.required],
        authorityName: ['', Validators.required],
        uri: ['', Validators.required],
        user: ['', Validators.required]
    });

    
    constructor(
        private formBuilder: FormBuilder,
        private projectService: ProjectService,
        public router: Router)
    {
        this.getProjects();
    }

    public getProjects()
    {
        this.projectService.getProjects().subscribe((result: any[]) => {
            this.projects = result;
        });
    }

    public createProject()
    {
        console.log(this.projectForm.value);
        this.projectService.createProject(this.projectForm.value).subscribe((result) => {
            console.log(result);
            UIkit.modal(this.modalElement.nativeElement).hide();
            this.getProjects();
        });
    }

}
