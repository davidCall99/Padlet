import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {PadletsListComponent} from "./padlets-list/padlets-list.component";
import {PadletDetailComponent} from "./padlet-detail/padlet-detail.component";
import {PadletDetailViewOnlyComponent} from "./padlet-detail-view-only/padlet-detail-view-only.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'padlets', component: PadletsListComponent},
  {path: 'padlet/:id', component: PadletDetailComponent},
  {path: 'padlet/:id/view-only', component: PadletDetailViewOnlyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
