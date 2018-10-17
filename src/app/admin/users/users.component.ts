import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './user.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent
{
    public users: any[] = [];
    public loading: boolean = true;

    @ViewChild('modalElement') modalElement: ElementRef;

    // TODO: Match validators with backend constraints
    public userForm = this.formBuilder.group({
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    
    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        public router: Router)
    {
        this.getUsers();
    }

    public getUsers()
    {
        this.loading = true;
        this.userService.getUsers().subscribe((result: any[]) => {
            this.users = result;
            this.loading = false;
        });
    }

    public createUser()
    {
        this.userService.createUser(this.userForm.value).subscribe((result) => {
            UIkit.modal(this.modalElement.nativeElement).hide();
            this.getUsers();
        });
    }

}
