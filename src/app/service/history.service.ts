import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(
    private http: HttpClient
  ) { }
  fetchQuestions(pageNo: number) {
    const params = new HttpParams()
      .set('action', 'getpagewithsearch')
      .set('pageno', `${pageNo}`)
      .set('pagesize', '10')
      .set('sortfield', 'ID')
      .set('sortdirection', '1');
    return this.http.post(
      'http://208.109.190.145:8085/CRUDGenericHandler/BUBadyaUniversityQuestionsCRUD.ashx',
      {},         // empty POST body
      { params }  // query string parameters
    );
  }
  fetchHistory(payload: any) {
    /* http://208.109.190.145:8085/CRUDGenericHandler/BUBadyaUniversityCRUD.ashx?action=getpagewithsearch&pageno=1&pagesize=1000&sortfield=RecordId&sortdirection=1 */
    const params = new HttpParams()
      .set('action', 'getpagewithsearch')
      .set('pageno', '1')
      .set('pagesize', '1000')
      .set('sortfield', 'RecordId')
      .set('sortdirection', '1');
    return this.http.post('http://208.109.190.145:8085/CRUDGenericHandler/BUBadyaUniversityCRUD.ashx',
      payload,         // empty POST body
      { params }  // query string parameters
    )
  }
  sendFormMainData(formData: any) {
    const params = new HttpParams()
      .set('action', 'insert')
    return this.http.post(
      'http://208.109.190.145:8085/CRUDGenericHandler/BUBadyaUniversityCRUD.ashx',
      formData,
      { params }  // query string parameters
    );
  }
  editRowFormData(formData: any) {
    const params = new HttpParams()
      .set('action', 'update')
    return this.http.post(
      'http://208.109.190.145:8085/CRUDGenericHandler/BUBadyaUniversityQuestions/update.ashx',
      formData,
      { params }  // query string parameters
    );
  }

}
