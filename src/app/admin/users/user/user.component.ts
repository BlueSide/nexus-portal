import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent
{
    public user: any;
    public loading: boolean = true;
    public saving: boolean = false;

    private username: string;

    // TODO: Match validators with backend constraints
    public userForm = this.formBuilder.group({
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        enabled: [false]
    });

    constructor(private router: Router,
                private route: ActivatedRoute,
                private userService:UserService,
                private formBuilder: FormBuilder)
    {
        this.username = this.route.snapshot.paramMap.get('username');
        this.refresh();
    }

    public save(): void
    {
        this.saving = true;
        this.userService.saveUser(this.username, this.userForm.value).subscribe((result) => {
            this.router.navigate(['/admin/users']);
            this.saving = false;
        });
    }

    public deleteUser(): void
    {
        UIkit.modal.confirm('Are you sure?').then( () => {
            this.loading = true;
            this.userService.deleteUser(this.username).subscribe(() => {
                this.loading = false;
                this.router.navigate(['/admin/users']);
            });            
        }, () => {
        });
    }

    public refresh(): void
    {
        this.loading = true;
        this.userService.getUser(this.username).subscribe((result) => {
            this.userForm.patchValue(result);
            this.user = result;
            this.loading = false;
        });
    }

}
