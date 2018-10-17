import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService
{

    // TODO: This service is kind of obsolete, remove it!
    constructor(private http: HttpClient)
    {
    }

    public getUserInfo(): any
    {
        return this.http.get<any>(`${environment.apiUrl}/api/user/me`);
    }

}
