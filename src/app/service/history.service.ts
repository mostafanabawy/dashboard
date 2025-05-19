import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(
    private http: HttpClient
  ) { }
  fetchQuestions() {
    const params = new HttpParams()
      .set('action', 'getpagewithsearch')
      .set('pageno', '1')
      .set('pagesize', '1000')
      .set('sortfield', 'ID')
      .set('sortdirection', '1');
    return this.http.post(
      'http://208.109.190.145:8085/CRUDGenericHandler/BUBadyaUniversityQuestionsCRUD.ashx',
      {},         // empty POST body
      { params}  // query string parameters
    );
  }
  fetchHistory() {
    const params = new HttpParams()
      .set('action', 'getpagewithsearch')
      .set('pageno', '1')
      .set('pagesize', '1000')
      .set('sortfield', 'RecordId')
      .set('sortdirection', '1');
    return this.http.post(
      'http://208.109.190.145:8085/CRUDGenericHandler/BUBadyaUniversityCRUD.ashx',
      {},         // empty POST body
      { params }  // query string parameters
    );
  }
}
