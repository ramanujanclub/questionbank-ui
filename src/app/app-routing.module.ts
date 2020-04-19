import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionuploadComponent} from './questionupload/questionupload.component';
import {HomeComponent} from './home/home.component';
import {VerifyandapproveComponent} from './verifyandapprove/verifyandapprove.component';
import {QuestioneditComponent} from './questionedit/questionedit.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'questionupload', component: QuestionuploadComponent },
  { path: 'verify', component: VerifyandapproveComponent },
  { path: 'edit/:questionId', component: QuestioneditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
