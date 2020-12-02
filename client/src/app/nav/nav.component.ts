import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any = {};
  loggedIn:boolean;

  constructor(public accountService: AccountService,private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {

  }


  login(){
    this.accountService.login(this.model).subscribe(
      response => {
        console.log(response);
        this.loggedIn = true;
        this.router.navigateByUrl('/members');
      },
      err => {
        this.toastr.error(err.error);
      }
    )
  }

  logout(){
    this.accountService.logout();
    this.loggedIn = false;
    this.router.navigateByUrl('/')
  }
}
