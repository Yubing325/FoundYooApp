import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';
import { IRegister } from '../models/IRegister';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerModel: IRegister;
  @Output() cancelRegistration = new EventEmitter();
  registerForm: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      confirmPassword: ['', [this.matchValues('password')]]
    })
  }

  matchValues(matchTo: string) : ValidatorFn{
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value? null : {isMatching:true}
    }
  }

  register(){
    console.log(this.registerForm.value);
    // this.accountService.register(this.registerModel).subscribe
    // (
    //   response =>{
    //     console.log("register success!");
    //     this.cancel()
    //   },
    //   err => {
    //     this.toastr.error(err.error);
    //   }
    // )
  }

  cancel(){
    this.cancelRegistration.emit(false);
  }

}
