import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { UserService, User } from './user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    constructor(
        public authService: AuthService
    )
    {}

}
