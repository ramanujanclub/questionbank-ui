import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {QuestionuploadService} from './services/questionupload.service';
import {
  CorrectAnswer, QuestionCorrectAnswer,
  QuestionHint,
  QuestionMetaData,
  QuestionOption, QuestionOptions,
  QuestionOwnerDetails,
  QuestionuploadModel
} from './model/questionupload.model';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-questionupload',
  templateUrl: './questionupload.component.html',
  styleUrls: ['./questionupload.component.css']
})
export class QuestionuploadComponent implements OnInit {
  @ViewChild('labelImport')
  labelImport: ElementRef;

  constructor(
              private apiService: QuestionuploadService,
              private httpClient: HttpClient
  ) {
    this.formImport = new FormGroup({
      uploadQuestionDescImage: new FormControl('', Validators.required),
      uploadScannedQuestionFile: new FormControl('', Validators.required)
    })
    ;
  }

  formImport: FormGroup;
  indexValue: number;
  questionUploadModel: QuestionuploadModel;
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
  chapterId: number;
  classId: number;
  questionMetadata: QuestionMetaData = {name: '', value: ''};
  questionOwnerDetails: QuestionOwnerDetails;

  temp: Array<CorrectAnswer>;

  mandatoryFormControl = new FormControl('', [
    Validators.required,
  ]);
  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required,
  ]);

  // matcher = new MyErrorStateMatcher();


  ngOnInit() {
    this.uploadScannedQuestion = false;
    this.multipleQuestionOption = [{optionKey: '', optionValue: ''}];
    this.questionOwnerDetails = {name: '', address: '', instituteName: '', schoolName: '', emailId: ''};
    this.questionHint = {hint: ''};

    this.apiService.get().subscribe((data: QuestionuploadModel) => {
      console.log(data);
      this.questionUploadModel = data;
    });

    this.indexValue = 0;
  }

  onQuestionDescImageChange(files: FileList) {
  /*  this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');*/
    this.questionDescriptionImage = files.item(0);
    console.log('Question Image', this.questionDescriptionImage.name);
  }

  onScannedQuestionFileChange(files: FileList) {
    /*this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');*/
    this.scannedQuestionFile = files.item(0);
    console.log('Scanned Question ', this.scannedQuestionFile.name);
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
      console.log('Answers: ', this.correctAnswers);
  }

  deleteItem(index): void {
    this.multipleQuestionOption.splice(index, 1);
  }

  uploadQuestion(): void {
    this.questionMetadata.name = this.questionMetadata.value;
    this.questionOptions = {multipleQuestionOption: this.multipleQuestionOption};
    this.questionCorrectAnswer = {correctAnswers: this.temp};

    this.questionUploadModel = {
      id: null,
      questionDescription: this.questionDescription,
      questionHeader: this.questionHeader,
      questionOptions: this.questionOptions,
      questionCorrectAnswer: this.questionCorrectAnswer,
      chapterId: this.chapterId,
      classId: this.classId,
      questionComplexityLevel: this.questionComplexityLevel,
      questionMetadata: this.questionMetadata,
      questionOwnerDetails: this.questionOwnerDetails,
      questionHint: this.questionHint
    };
    console.log(JSON.stringify(this.questionUploadModel));
    const formData = new FormData();
    formData.append('questionContentImage', this.questionDescriptionImage);
    formData.append('scannedQuestionFile', this.scannedQuestionFile);
    formData.append('question', JSON.stringify(this.questionUploadModel));

    const SERVER_URL = 'http://localhost:8080/api/v1/questionbank/upload';

    this.httpClient.post<any>(SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
