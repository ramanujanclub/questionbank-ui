import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionuploadService {

  private SERVER_URL = 'http://localhost:8080/api/v1/questionbank/questions/bc2464e1-5d37-4740-a6b0-58db934d7378';
  constructor(private httpClient: HttpClient) { }

  public get() {
    return this.httpClient.get(this.SERVER_URL);
  }
}
