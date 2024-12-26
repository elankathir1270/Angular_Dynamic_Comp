import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users: User[] = [];
  userToDelete: User;
  showDeleteAlert: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.users;
  }

  OnDeleteClicked(user: User) {
    this.showDeleteAlert = true;
    this.userToDelete = user;
  }
  onUserDeletionConfirmed(value: boolean) {
    this.showDeleteAlert = false;
    if (value) {
      let index = this.userService.users.indexOf(this.userToDelete);
      this.userService.users.splice(index, 1);
    }
  }
}
