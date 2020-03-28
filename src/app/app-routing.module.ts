import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionuploadComponent} from './questionupload/questionupload.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'questionupload', component: QuestionuploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
