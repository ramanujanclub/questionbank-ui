import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {globalConfig} from '../../global-configuration';
import {HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuestionuploadService {

  readonly url = 'http://localhost:8080' + `${globalConfig.endpoints.baseURL}`;
  readonly listQuestionUrl = this.url + `${globalConfig.endpoints.listQuestionURL}`;
  readonly uploadQuestionUrl = this.url + `${globalConfig.endpoints.uploadQuestionURL}`;
  readonly uploadParentQuestionUrl = this.url + `${globalConfig.endpoints.uploadParentQuestionURL}`;

  constructor(private httpClient: HttpClient) {
  }

  public get() {
    return this.httpClient.get(`${this.listQuestionUrl}` + '/bc2464e1-5d37-4740-a6b0-58db934d737');
  }

  public uploadQuestion(payload) {
    return this.httpClient.post<any>(`${this.uploadQuestionUrl}`, payload);
  }

  public uploadParentQuestion(payload) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.post<any>(`${this.uploadParentQuestionUrl}`, JSON.stringify(payload), httpOptions);
  }
}
