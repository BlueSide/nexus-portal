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
        this.getUserInfo();
    }

    ngOnInit() {
    }

    public getUserInfo(): void
    {
        this.api.getUserInfo().subscribe(
            (result) => {
                this.projects = result.projects;
            }
        );
    }
}
