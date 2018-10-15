import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
    constructor(private http: HttpClient) {}

    public getCurrentUser(): Observable<any>
    {
        return this.http.get<any>(`${environment.apiUrl}/api/user/me`);
    }

    public getUsers(): Observable<any[]>
    {
        return this.http.get<any[]>(`${environment.apiUrl}/api/users`);
    }

    public getUser(username: string): Observable<any[]>
    {
        return this.http.get<any[]>(`${environment.apiUrl}/api/users/${username}`);
    }

    public saveUser(username: string, user: User): Observable<any>
    {
        return this.http.post<any>(`${environment.apiUrl}/api/users/` + username, user);
    }
    
    public createUser(user: User): Observable<any>
    {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/signup`, user);
    }
}

export class User
{
    id: number;
    name: string;
    username: string;
    password?: string;
    
    constructor(name: string, username: string, email: string) {}
}
