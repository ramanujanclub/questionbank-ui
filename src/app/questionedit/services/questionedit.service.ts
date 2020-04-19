import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {globalConfig} from '../../global-configuration';
import {VerifyQuestionRequest} from '../model/questionedit.model';

@Injectable({
  providedIn: 'root'
})
export class QuestioneditService {

  readonly baseUrl = 'http://localhost:8080' + `${globalConfig.endpoints.baseURL}`;
  verifyQuestionRequest: VerifyQuestionRequest = {verifiedByUserId: ''};

  constructor(private httpClient: HttpClient) { }

  public getQuestionByQuestionId(questionId: string) {
    return this.httpClient.get<any>(`${this.baseUrl}` + questionId);
  }

  public verifyQuestion(questionId: string, userId: string) {
    this.verifyQuestionRequest.verifiedByUserId = 'aniwesh';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.patch<any>(`${this.baseUrl}` + questionId + '/verify', JSON.stringify(this.verifyQuestionRequest), httpOptions);
  }
}
