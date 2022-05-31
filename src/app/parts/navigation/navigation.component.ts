import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { Role } from 'src/app/enum/Role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  currentUserSubscription: Subscription;
  name$;
  name: string;
  currentUser: JwtResponse;
  root = '/';
  Role = Role;

  constructor(private userService: UserService,
              private router: Router,
  ) {

  }


  ngOnInit() {
      this.name$ = this.userService.name$.subscribe(aName => this.name = aName);
      this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
          this.currentUser = user;
          if (!user || user.role == Role.Customer) {
              this.root = '/';
          } else {
              this.root = '/seller';
          }
      });
  }

  ngOnDestroy(): void {
      this.currentUserSubscription.unsubscribe();
      
  }

  logout() {
      this.userService.logout();
  }

}

