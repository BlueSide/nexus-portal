import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit
{
    public projects: any[];
    
    constructor(private api: ApiService)
    {
    }

    ngOnInit() {
    }

    public getUserInfo(): void
    {
        /*
        this.api.getProjects().subscribe(
            (projects) => {
                console.log(projects);
                this.projects = projects;
            }
        );
*/
    }
}
