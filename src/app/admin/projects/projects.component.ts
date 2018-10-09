import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService, Project } from './project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit
{

    public projects: any[] = [];
    
    constructor(
        private projectService: ProjectService,
        public router: Router)
    {
        this.getProjects();
    }

    ngOnInit()
    {
        
    }

    public getProjects()
    {
        this.projectService.getProjects().subscribe((result: any[]) => {
            this.projects = result;
        });
    }

    test()
    {
        let project: Project = {
            name: 'Test Project',
            uri: 'https://nexus.blueside.nl/test-project',
            authorityName: 'Test_Project'
        };
        this.projectService.createProject(project).subscribe((result) => {
            this.getProjects();
        });
    }

}
