import { Component } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private accountService: AccountService){}
  ngOnInit() {
    this.setCurrentUser(); 
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('___user'));
    this.accountService.setCurrentUser(user);
  }
  
}
