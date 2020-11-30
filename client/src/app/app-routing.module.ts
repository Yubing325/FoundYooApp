import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegisterPageComponent } from './user-register/user-register-page/user-register-page.component';

const routes: Routes = [
  {path:'register', component: UserRegisterPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
