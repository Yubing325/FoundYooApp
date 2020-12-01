import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [UserRegisterPageComponent, UserRegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    UserRegisterPageComponent, UserRegisterComponent
  ]
})
export class UserRegisterModule { }
