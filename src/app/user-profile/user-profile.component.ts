import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService, User } from '../user.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit
{
    public loaded: boolean = true;
    public oldUsername: string;
    
    profileForm = this.formBuilder.group({
        name: ['', Validators.required],
        username: ['', Validators.required],
    });

    
    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder
    )
    {
        
        this.userService.getCurrentUser().subscribe((user: User) => {
            this.oldUsername = user.username;
            this.profileForm.setValue({
                name: user.name,
                username: user.username
            });
            this.loaded = true;
        });
        
    }

    ngOnInit()
    {
        
    }

    public onSubmit(): void
    {
        let usr: any = this.profileForm.value;
        usr.id = 33;
        this.userService.saveUserProfile(this.oldUsername, usr).subscribe((data) => {
            console.log("Saved!");
            console.log(data);
        });
    }
}
