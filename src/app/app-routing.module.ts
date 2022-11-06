import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { IsSignedInGuard } from './services/is-signed-in.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'add',
    component: AddUserComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
