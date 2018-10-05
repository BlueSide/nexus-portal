import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, LoginRequest } from '../api.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
    public loginFailed: boolean;
    
    public loginRequest: LoginRequest = {
        usernameOrEmail: null,
        password: null,
        redirectUrl: "/"
    };
    
    constructor(
        private api: ApiService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit()
    {
        // NOTE: Get redirect URL from the Route parameters
        this.route.params.subscribe((params) => this.loginRequest.redirectUrl = params.redirectUrl);
    }
    
    public login(): void
    {
        // NOTE: Try to login and redirect if successful 
        this.loginFailed = false;
        this.api.login(this.loginRequest).subscribe(
            (response) => {
                console.log(response);
                localStorage.setItem("jwt", response.accessToken);
                window.location.replace(response.redirectUrl);
            },
            (error) => {
                console.log(error);
                this.loginFailed = true;
            }
        );
    }

}
