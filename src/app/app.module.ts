import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

//TODO: Lazy loading
const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: '', component: PortalComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        PortalComponent,
        UserProfileComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
