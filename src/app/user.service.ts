import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
    constructor(private api: ApiService)
    {
        
    }

    public getCurrentUser(): any
    {
        return this.api.get('/api/user/me');        
    }

    public saveUserProfile(username: string, user: User): any
    {
        return this.api.post('/api/users/' + username, user);
    }
}

export class User
{
    id: number;
    name: string;
    username: string;
    
    constructor(name: string, username: string, email: string) {}
}
