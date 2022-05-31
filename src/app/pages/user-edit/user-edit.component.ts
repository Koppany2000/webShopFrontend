import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { Role } from 'src/app/Role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{




  constructor(private userService: UserService,
              private router: Router) {
  }

  user= new User();


  ngOnInit() {
      const account = this.userService.currentUserValue.account;

      this.userService.get(account).subscribe( u => {
          this.user = u;
          this.user.password = '';
      }, e => {

      });
  }

  onSubmit() {
      this.userService.update(this.user).subscribe(u => {
          this.userService.nameTerms.next(u.name);
          let url = '/';
          if (this.user.role != Role.Customer) {
              url = '/seller';
          }
          this.router.navigateByUrl(url);
      }, _ => {})
  }

}