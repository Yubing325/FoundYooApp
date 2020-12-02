import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { IRegister } from '../models/IRegister';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  endpoint: string = "https://localhost:5001";
  registerModel: IRegister;

  @Output() cancelRegistration = new EventEmitter();

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerModel = {
      username:'',
      password:''
    }
  }


  register(){
    this.accountService.register(this.registerModel).subscribe
    (
      response =>{
        console.log("register success!");
        this.cancel()
      },
      err => {
        this.toastr.error(err.error);
      }
    )
  }

  cancel(){
    this.cancelRegistration.emit(false);
  }

}
