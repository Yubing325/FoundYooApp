import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginationResult: PaginatedResult<Member[]> = new PaginatedResult<Member []>();

  constructor(private http: HttpClient) { }

  // getMembers(): Observable<Member[]> {
  //   if(this.members.length > 0) return of(this.members);
  //   return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
  //     map(members => {
  //       this.members = members;
  //       return this.members;
  //     })
  //   );
  // }

  getMembers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if(page !== null && itemsPerPage !== null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
     map(response =>{
       this.paginationResult.result = response.body;
       if(response.headers.get('Pagination')!== null){
         this.paginationResult.pagination = JSON.parse(response.headers.get('Pagination'))
       }

       return this.paginationResult;
     })
    );
  }

  getMember(username: string) : Observable<Member>{
    const member = this.members.find(t=>t.username === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member){
    return this.http.put<Member>(this.baseUrl + 'users',member)
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
