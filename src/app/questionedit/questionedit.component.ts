import {Component, OnInit} from '@angular/core';
import {QuestioneditService} from './services/questionedit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionuploadModel} from '../questionupload/model/questionupload.model';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {globalConfig} from '../global-configuration';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-questionedit',
  templateUrl: './questionedit.component.html',
  styleUrls: ['./questionedit.component.css']
})
export class QuestioneditComponent implements OnInit {

  questionId = this.Activatedroute.snapshot.paramMap.get('questionId');
  questionModel: QuestionuploadModel;
  barButtonOptions: MatProgressButtonOptions = {
    active: false, text: 'Verify Question', buttonColor: 'primary', barColor: 'accent', raised: true, stroked: false,
    mode: 'indeterminate', value: 0, disabled: false, fullWidth: false, buttonIcon: {fontIcon: 'save'}
  };

  constructor(private questioneditService: QuestioneditService,
              private Activatedroute: ActivatedRoute,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.questioneditService.getQuestionByQuestionId(this.questionId).subscribe(
      (response) => {
        this.questionModel = response;
      },
      (err) => {
      }
    );
  }

  verifyQuestion() {
    this.questioneditService.verifyQuestion(this.questionId, 'aniwesh').subscribe(
      (response) => {
        this.verificationSuccessMessage();
        setTimeout(() => this.router.navigate(['/verify']), 5000);
      },
      (err) => {
        this.verificationFailureMessage();
      }
    );
  }

  verificationSuccessMessage(): void {
    this.barButtonOptions.active = false;
    this.barButtonOptions.text = `${globalConfig.buttontext.verifyQuestion}`;
    this.openSnackBar(`${globalConfig.alertmessages.verifyQuestionSuccess}`, '', 'snack-bar-success');
  }

  verificationFailureMessage(): void {
    this.barButtonOptions.active = false;
    this.barButtonOptions.text = `${globalConfig.buttontext.verifyQuestion}`;
    this.openSnackBar(`${globalConfig.alertmessages.verifyQuestionFailure}`, '', 'snack-bar-error');
  }

  openSnackBar(message: string, action: string, customClass: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: customClass
    });
  }

}
