import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {globalConfig} from '../../global-configuration';
import {ParentquestionModel} from '../model/parentquestion.model';


@Injectable({
  providedIn: 'root'
})
export class QuestionuploadService {

  readonly baseUrl = 'http://localhost:8080' + `${globalConfig.endpoints.baseURL}`;
  readonly imageurl = `${globalConfig.endpoints.uploadImageURL}`;
  readonly uploadQuestionUrl = this.baseUrl + `${globalConfig.endpoints.uploadQuestionURL}`;
  readonly uploadParentQuestionUrl = this.baseUrl + `${globalConfig.endpoints.uploadParentQuestionURL}`;
  readonly getParentQuestionsByUserUrl = this.baseUrl + `${globalConfig.endpoints.parentQuestionByUserURL}`;

  parentQuestion: ParentquestionModel;

  constructor(private httpClient: HttpClient) {
  }

  public uploadQuestion(payload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.post<any>(`${this.uploadQuestionUrl}`, JSON.stringify(payload), httpOptions);
  }

  public uploadQuestionImage(questionId, payload) {
    return this.httpClient.put<any>(`${this.baseUrl}` + questionId + `${this.imageurl}`, payload);
  }

  public uploadParentQuestion(payload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.post<any>(`${this.uploadParentQuestionUrl}`, JSON.stringify(payload), httpOptions);
  }

  public uploadParentQuestionImage(questionId, payload) {
    return this.httpClient.put<any>(`${this.baseUrl}` + 'parentquestion/' + questionId + `${this.imageurl}`, payload);
  }

  public getParentQuestionsByUser(userId: string) {
    return this.httpClient.get<any>(`${this.getParentQuestionsByUserUrl}` + userId);
  }

}
