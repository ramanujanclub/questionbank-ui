import {Injectable} from '@angular/core';
import {globalConfig} from '../../global-configuration';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerifyandapproveService {

  readonly baseUrl = 'http://localhost:8080' + `${globalConfig.endpoints.baseURL}`;
  readonly getQuestionsByUserUrl = this.baseUrl + `${globalConfig.endpoints.questionByUserURL}`;

  constructor(private httpClient: HttpClient) { }

  public getQuestionsByUser(userId: string) {
    return this.httpClient.get<any>(`${this.getQuestionsByUserUrl}` + userId);
  }
}
