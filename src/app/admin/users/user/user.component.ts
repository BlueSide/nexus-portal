import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent
{
    public user: any;

    private username: string;

    // TODO: Match validators with backend constraints
    public userForm = this.formBuilder.group({
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
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
        this.userService.saveUser(this.username, this.userForm.value).subscribe((result) => {
            this.router.navigate(['/admin/users']);
        });
    }

    public refresh(): void
    {
        this.userService.getUser(this.username).subscribe((result) => {
            this.userForm.patchValue(result);
            this.user = result;
        });
    }


}
