import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IRegister } from '../models/IRegister';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  endpoint: string = "https://localhost:5001";
  registerModel: IRegister;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.registerModel = {
      username:'',
      password:''
    }
  }


  submit(){
    this.http.post(this.endpoint+"/api/account/register", this.registerModel).subscribe
    (
      response =>{
        console.log("register success!")
      },
      err => {
        console.error
      }
    )
  }
}
