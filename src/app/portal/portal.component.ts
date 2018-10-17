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
    public loading: boolean = true;
    
    constructor(private api: ApiService)
    {
        this.getUserInfo();
    }

    ngOnInit() {
    }

    public getUserInfo(): void
    {
        this.loading = true;
        this.api.getUserInfo().subscribe(
            (result) => {
                this.projects = result.projects;
                this.loading = false;
            }
        );
    }
}
