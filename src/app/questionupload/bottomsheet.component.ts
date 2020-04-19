import {Component, OnInit} from '@angular/core';
import {QuestionuploadService} from './services/questionupload.service';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ParentquestionModel} from './model/parentquestion.model';


@Component({
  selector: 'app-bottomsheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
})
export class BottomsheetComponent implements OnInit{
  parentQuestionModel: ParentquestionModel;
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomsheetComponent>,
              private questionuploadService: QuestionuploadService) {}

  ngOnInit(): void {
    this.parentQuestionModel = this.questionuploadService.parentQuestion;
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
