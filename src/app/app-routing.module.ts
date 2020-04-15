import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionuploadComponent} from './questionupload/questionupload.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'questionupload', component: QuestionuploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
