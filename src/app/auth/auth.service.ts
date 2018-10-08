import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const LOGIN_ENDPOINT: string = '/api/auth/signin';
const jwtHelper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    constructor (
        private http: HttpClient,
        private router: Router) {}
    
    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(loginRequest: LoginRequest)
    {
        // NOTE: Try to login and redirect if successful 
        let url: string = `${environment.apiUrl}${LOGIN_ENDPOINT}`;
        return this.http.post<any>(url, loginRequest)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.accessToken)
                {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    public logout(): void
    {
        localStorage.removeItem("currentUser");
        window.location.reload(true);
    }
    
    public isAuthenticated(): boolean
    {
        // First we check if the current user and token actually exist
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(!(currentUser && currentUser.accessToken)) return false;

        // Then we check if the token is expired
        return !jwtHelper.isTokenExpired(currentUser.accessToken);
    }

    public isAdmin(): boolean
    {
        if(!this.isAuthenticated()) return false;
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //console.log(currentUser.roles);
        for(let role of currentUser.roles)
        {
            if(role.name === "ROLE_ADMIN") return true;
        }

        return false;
    }
}

export interface LoginRequest
{
    usernameOrEmail: string;
    password: string;
}
