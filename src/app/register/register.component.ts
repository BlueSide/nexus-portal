import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent
{
    public registration: Registration = {
        name: null,
        username: null,
        email: null,
        password: null
    };
    
    constructor(
        private api: ApiService,
        private router: Router
    ) { }

    public register()
    {
        this.api.register(this.registration).subscribe((registration) => {
            if(registration.success)
            {
                this.router.navigate(['login']);
            }
        });
    }
}

interface Registration
{
    name: string;
    username: string;
    email: string;
    password: string;
}
