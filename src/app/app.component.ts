import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UserService, User } from './user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    user: any = {};
    loggedIn: boolean = false;
    
    constructor(
        private api: ApiService,
        private userService: UserService,
        private router: Router
    )
    {
        this.getUserInfo();
    }

    public login()
    {
        let credentials:any = {
            "usernameOrEmail": "marlon@blueside.nl",
            "password": "zegiknie"
        };
        this.api.login(credentials).subscribe((data) => {
            localStorage.setItem("jwt", data.accessToken);
            this.getUserInfo();
        });
    }

    public logout()
    {
        localStorage.removeItem("jwt");
        window.location.replace('');
    }

    public register()
    {
        let credentials:any = {
            "name": "Marlon Peeters",
            "username": "cikzh",
            "email": "marlon@blueside.nl",
            "password": "zegiknie"
        };
        this.api.register(credentials).subscribe((data) => console.log(data));
    }
    
    public getUserInfo()
    {
        this.userService.getCurrentUser().subscribe(
            (user: User) => {
                this.user = user;
                this.loggedIn = true;
            },
            (error) => {
                this.router.navigate(['/login', { redirectUrl: '' } ]);
            }
        );
    }
}
