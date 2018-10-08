import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService
{

    constructor(private http: HttpClient)
    {
    }
    
    public register(registration: any): any
    {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/signup`, registration, this.makeOptions());
    }

    public getUserInfo(): any
    {
        return this.http.get<any>(`${environment.apiUrl}/api/user/me`, this.makeOptions());
    }

    public getProjects(): any
    {
        return this.http.get<any>(`${environment.apiUrl}/api/projects`, this.makeOptions());
    }

    public get(endpoint: string): any
    {
        return this.http.get<any>(environment.apiUrl + endpoint, this.makeOptions());
    }

    public put(endpoint: string, payload: any): any
    {
        return this.http.put<any>(environment.apiUrl + endpoint, payload, this.makeOptions());
    }

    public post(endpoint: string, payload: any): any
    {
        return this.http.post<any>(environment.apiUrl + endpoint, payload, this.makeOptions());
    }
    
    private makeOptions(): any
    {
        let headersObj: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
//            'Authorization': 'Bearer ' + localStorage.getItem("jwt")
        };

        let headers = new HttpHeaders(headersObj);
        return {headers: headers};
    }

}
