import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {QuestionuploadService} from './services/questionupload.service';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {
  CorrectAnswer,
  QuestionCorrectAnswer,
  QuestionHint,
  QuestionMetaData,
  QuestionOption,
  QuestionOptions,
  QuestionOwnerDetails,
  QuestionuploadModel
} from './model/questionupload.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {globalConfig} from '../global-configuration';
import {ParentquestionModel} from './model/parentquestion.model';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomsheetComponent} from './bottomsheet.component';

@Component({
  selector: 'app-questionupload',
  templateUrl: './questionupload.component.html',
  styleUrls: ['./questionupload.component.css']
})
export class QuestionuploadComponent implements OnInit {
  @ViewChild('labelImport')
  labelImport: ElementRef;

  constructor(
    private questionuploadService: QuestionuploadService,
    private httpClient: HttpClient,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    // tslint:disable-next-line:variable-name
    private _bottomSheet: MatBottomSheet
  ) {
    this.formImport = new FormGroup({
      uploadQuestionDescImage: new FormControl('', Validators.required),
      uploadScannedQuestionFile: new FormControl('', Validators.required),
      uploadQuestionHintImage: new FormControl('', Validators.required)
    })
    ;
  }

  formImport: FormGroup;
  indexValue: number;
  questionUploadModel: QuestionuploadModel;
  parentQuestionModel: ParentquestionModel;
  isParent: boolean;
  questionHeader: string;
  questionDescription: string;
  uploadScannedQuestion: boolean;
  questionDescriptionImage: File = null;
  scannedQuestionFile: File = null;
  questionOptions: QuestionOptions;
  multipleQuestionOption: Array<QuestionOption> = [{optionKey: '', optionValue: ''}];
  questionCorrectAnswer: QuestionCorrectAnswer;
  correctAnswers: Array<CorrectAnswer> = [{answerKey: '', answerValue: ''}];
  questionComplexityLevel: string;
  questionHint: QuestionHint;
  questionHintImage: File = null;
  chapterId: number;
  classId: number;
  questionNote: string;
  questionMetadata: QuestionMetaData = {name: '', value: ''};
  questionOwnerDetails: QuestionOwnerDetails;
  parentQuestionId: string;
  attachParent: boolean;
  parentQuestionList: Array<ParentquestionModel>;

  temp: Array<CorrectAnswer>;

  mandatoryFormControl = new FormControl('', [
    Validators.required,
  ]);
  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required,
  ]);

  // matcher = new MyErrorStateMatcher();

  barButtonOptions: MatProgressButtonOptions = {
    active: false, text: 'Upload Question', buttonColor: 'primary', barColor: 'accent', raised: true, stroked: false,
    mode: 'indeterminate', value: 0, disabled: false, fullWidth: false, buttonIcon: {fontIcon: 'save'}
  };

  ngOnInit() {
    this.uploadScannedQuestion = false;
    this.attachParent = false;
    this.multipleQuestionOption = [{optionKey: '', optionValue: ''}];
    this.questionOwnerDetails = {name: '', address: '', instituteName: '', schoolName: '', emailId: ''};
    this.questionHint = {hint: ''};
    this.indexValue = 0;
    // hardcoded
    const userId = 'aniwesh';
    this.questionuploadService.getParentQuestionsByUser(userId).subscribe(
      (response) => {
        this.parentQuestionList = response;
      },
      (err) => {
        console.log(err);
      }
    );

  }

  setImageFiles(event, action) {
    if (action === `${globalConfig.constants.questionDescImage}`) {
      this.questionDescriptionImage = event.target.files.item(0);
    } else if (action === `${globalConfig.constants.scannedQuestionFile}`) {
      this.scannedQuestionFile = event.target.files.item(0);
    } else if (action === `${globalConfig.constants.hintImage}`) {
      this.questionHintImage = event.target.files.item(0);
    }
  }

  addItem(): void {
    this.multipleQuestionOption[this.indexValue.toString()].optionKey = this.indexValue;
    this.indexValue = this.indexValue + 1;
    this.multipleQuestionOption.push({optionKey: '', optionValue: ''});
  }

  getCorrectAnswer(key, value): void {
    this.temp = [{answerKey: '', answerValue: ''}];
    this.temp[0].answerValue = value;
    this.temp[0].answerKey = key;
    this.correctAnswers = this.temp;
  }

  deleteItem(index): void {
    this.multipleQuestionOption.splice(index, 1);
  }

  uploadQuestion(): void {
    this.barButtonOptions.active = true;
    this.barButtonOptions.text = `${globalConfig.buttontext.questionUploadInProgess}`;

    this.questionMetadata.name = this.questionMetadata.value;
    this.questionOptions = {multipleQuestionOption: this.multipleQuestionOption};
    this.questionCorrectAnswer = {correctAnswers: this.temp};

    const formData = new FormData();
    formData.append('questionContentFile', this.questionDescriptionImage);
    formData.append('scannedQuestionFile', this.scannedQuestionFile);

    if (this.isParent) {
      this.parentQuestionModel = {
        parentQuestionId: this.parentQuestionId === undefined ? null : this.parentQuestionId,
        questionDescription: this.questionDescription,
        questionCategory: null,
        questionHeader: this.questionHeader,
        questionNote: this.questionNote,
        questionComplexityLevel: this.questionComplexityLevel,
        classId: this.classId,
        questionDescriptionImage: null,
        scannedQuestionImage: null
      };
      this.questionuploadService.uploadParentQuestion(this.parentQuestionModel).subscribe(
        (res) => {
          this.questionuploadService.uploadParentQuestionImage(res.parentQuestionId, formData).subscribe(
            (resp) => {
              this.questionUploadSuccessMessage();
              setTimeout(() => window.location.reload(), 5000);
            }, (exp) => {
              this.questionUploadFailureMessage();
            }
          );
        },
        (err) => {
          this.questionUploadFailureMessage();
        });
    } else {
      this.questionUploadModel = {
        questionId: null,
        questionDescription: this.questionDescription,
        questionHeader: this.questionHeader,
        questionOptions: this.questionOptions,
        questionCorrectAnswer: this.questionCorrectAnswer,
        chapterId: this.chapterId,
        classId: this.classId,
        questionComplexityLevel: this.questionComplexityLevel,
        questionMetadata: this.questionMetadata,
        questionOwnerDetails: this.questionOwnerDetails,
        questionHint: this.questionHint,
        questionStatus: null
      };
      formData.append('questionHintAsImage', this.questionHintImage);
      this.questionuploadService.uploadQuestion(this.questionUploadModel).subscribe(
        (res) => {
          this.questionuploadService.uploadQuestionImage(res.questionId, formData).subscribe(
            (resp) => {
              this.questionUploadSuccessMessage();
              setTimeout(() => window.location.reload(), 5000);
            }, (exp) => {
              this.questionUploadFailureMessage();
            }
          );
        },
        (err) => {
          this.questionUploadFailureMessage();
        }
      );
    }
  }

  openSnackBar(message: string, action: string, customClass: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: customClass
    });
  }

  questionUploadSuccessMessage(): void {
    this.barButtonOptions.active = false;
    this.barButtonOptions.text = `${globalConfig.buttontext.questionUpload}`;
    this.openSnackBar(`${globalConfig.alertmessages.questionUploadSuccess}`, '', 'snack-bar-success');
  }

  questionUploadFailureMessage(): void {
    this.barButtonOptions.active = false;
    this.barButtonOptions.text = `${globalConfig.buttontext.questionUpload}`;
    this.openSnackBar(`${globalConfig.alertmessages.questionUploadFailure}`, '', 'snack-bar-error');
  }

  openBottomSheet(index: number, event: any): void {
    if (event.isUserInput) {// ignore on deselection of the previous option, as is the case of onSelectionChange
      this.questionuploadService.parentQuestion = this.parentQuestionList[index];
      this._bottomSheet.open(BottomsheetComponent);
    }
  }

}

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

