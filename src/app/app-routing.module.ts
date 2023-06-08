import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmpComponent } from './cmp/cmp.component';
import { SlotComponent } from './slot/slot.component';
import { RegisterComponent } from './RegLogin/register/register.component';
import { LoginComponent } from './RegLogin/login/login.component';
import { AuthGuard } from './RegLogin/Auth/auth.guard'
const routes: Routes = [
  
  {path:'slots' , component:SlotComponent , canActivate:[AuthGuard]},
  // {path:'slots' , component:SlotComponent},

  {path:'reg' , component:RegisterComponent},
  {path:'login' , component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
