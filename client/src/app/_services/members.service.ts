import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParameters } from '../_models/userParameters';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];
  user: User;
  userParams: UserParameters;
  memberCache = new Map();

  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParameters(user);
    })
  }

  // getMembers(): Observable<Member[]> {
  //   if(this.members.length > 0) return of(this.members);
  //   return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
  //     map(members => {
  //       this.members = members;
  //       return this.members;
  //     })
  //   );
  // }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParameters) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParameters(this.user);
    return this.userParams;
  }


  getMembers(userParams: UserParameters) {
    //console.log(Object.values(userParams).join('-'));
    let response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response){
      return of(response);
    }
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginationResult<Member[]>(this.baseUrl + 'users', params).pipe(
      map(res => {
        this.memberCache.set(Object.values(userParams).join('-'), res)
        return res;
      })
    );
  }

  private getPaginationResult<T>(url:string, params: HttpParams) {
    const paginationResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginationResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginationResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }

  getMember(username: string) : Observable<Member>{
    //console.log(this.memberCache);
    const member =[...this.memberCache.values()].reduce((arr,elem)=>arr.concat(elem.result),[])
                  .find((member:Member)=>member.username === username); //convert into an array
    
    if(member) {
      return of(member);
    }
    
    console.log(member);
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

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }

  getLikes(type: string, pageNumber, pageSize) {
    let params = this.getPaginationHeaders(pageNumber, pageSize);
    params = params.append('type', type);
    return this.getPaginationResult<Partial<Member[]>>(this.baseUrl + 'likes', params);
  }
}
