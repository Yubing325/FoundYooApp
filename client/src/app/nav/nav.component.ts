import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }


  login(){
    this.accountService.login(this.model).subscribe(
      response => {
        console.log(response);

      },
      err => console.error(err)
    )
  }

  logout(){
    
  }
}
