import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  searchActivated: boolean = false;
  currentKeyword: string = "";

  constructor(private http: HttpClient) { }

  getUsers(keyword): Observable<any> {
    return this.http.get(keyword).pipe(
      map(this.getData));
  }

  getUser(user): Observable<any> {
    return this.http.get(user).pipe(
      map(this.getData));
  }

  getFollowers(userFollowers): Observable<any> {
    return this.http.get(userFollowers).pipe(
      map(this.getData));
  }

  getData(res: Response) {
    let body = res;
    return body || { };
  }
}
