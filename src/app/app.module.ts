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

//TODO: Lazy loading
//TODO: Move to routing module
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: PortalComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent }
];

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
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
