import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, LoginRequest } from '../auth.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
    public isLoggedIn: boolean;
    public loading = false;
    public submitted = false;
    public error = '';
    public returnUrl: string;

    
    public loginRequest: LoginRequest = {
        usernameOrEmail: null,
        password: null,
    };
    
    
    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit()
    {
        // NOTE: Get redirect URL from the Route parameters
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

    public login()
    {
        this.submitted = true;

        // stop here if form is invalid
        /*
        if (this.loginForm.invalid) {
            return;
        }
*/
        this.loading = true;
        this.authService.login(this.loginRequest)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
