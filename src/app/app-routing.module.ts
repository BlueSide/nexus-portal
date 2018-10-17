import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { PortalComponent } from './portal/portal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './auth/auth.guard';

//TODO: Lazy loading
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: PortalComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
