import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from './admin/admin-routing.module';

import { AuthInterceptor } from './auth/auth.interceptor'
import { ErrorInterceptor } from './error.interceptor'

import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { PortalComponent } from './portal/portal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectComponent } from './admin/projects/project/project.component';
import { UserComponent } from './admin/users/user/user.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PortalComponent,
        PageNotFoundComponent,
        ProjectComponent,
        UserComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AdminRoutingModule,
        AppRoutingModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
