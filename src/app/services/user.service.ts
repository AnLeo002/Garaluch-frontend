import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private httpClient:HttpClient) { }

  public registerUser(user:any){
    return this.httpClient.post(`${baseUrl}/auth/sign-up`,user);
  }
  public updateUser(user:any,id:any){
    return this.httpClient.put(`${baseUrl}/auth/update/${id}`,user);
  }
  public deleteUser(id:any){
    return this.httpClient.delete(`${baseUrl}/auth/delete/${id}`);
  }
  public findAllUsers(){
    return this.httpClient.get(`${baseUrl}/findAll`);
  }
}
