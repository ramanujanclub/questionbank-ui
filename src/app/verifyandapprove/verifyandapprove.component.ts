import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {VerifyandapproveService} from './services/verifyandapprove.service';
import {QuestionuploadModel} from '../questionupload/model/questionupload.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface PeriodicElement {
  xyz: number;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},{ xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},{ xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},{ xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { xyz: 23, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},



];

/**
 * @title Table with filtering
 */

@Component({
  selector: 'app-verifyandapprove',
  templateUrl: './verifyandapprove.component.html',
  styleUrls: ['./verifyandapprove.component.css']
})
export class VerifyandapproveComponent implements OnInit {

  constructor(
    private verifyandapproveService: VerifyandapproveService
  ) { }
  displayedColumns: string[] = ['questionHeader', 'questionDescription', 'questionCorrectAnswer', 'action'];
  questionList: Array<QuestionuploadModel>;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    const userId = 'aniwesh';
    this.verifyandapproveService.getQuestionsByUser(userId).subscribe(
      (response) => {
        this.questionList = response;
        this.dataSource = new MatTableDataSource(this.questionList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
