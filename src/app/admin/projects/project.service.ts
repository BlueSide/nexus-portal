import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService
{

    constructor(private http: HttpClient) { }

    public getProjects(): Observable<Project[]>
    {
        return this.http.get<any[]>(`${environment.apiUrl}/api/projects`);
    }

    public getProject(id: number): Observable<Project>
    {
        return this.http.get<Project>(`${environment.apiUrl}/api/projects/${id}`);
    }

    public createProject(project: Project): Observable<any>
    {
        return this.http.post<Project>(`${environment.apiUrl}/api/projects`, project);
    }

    public saveProject(id: number, project: Project): Observable<Project>
    {
        return this.http.put<Project>(`${environment.apiUrl}/api/projects/${id}`, project);
    }

    public deleteProject(id: number): Observable<any>
    {
        return this.http.delete<any>(`${environment.apiUrl}/api/projects/${id}`);
    }
    
    public addUser(projectId: number, username: string): Observable<any>
    {
        return this.http.post<any>(`${environment.apiUrl}/api/projects/${projectId}/users/${username}`, {});
    }
    
    public removeUser(projectId: number, username: string): Observable<any>
    {
        return this.http.delete<any>(`${environment.apiUrl}/api/projects/${projectId}/users/${username}`, {});
    }

}

export interface Project
{
    id?: number;
    name: string;
    uri: string;
    authorityName: string;
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
}
