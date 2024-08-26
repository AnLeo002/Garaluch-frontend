import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private httpClient:HttpClient) { }
  public login(loginData:any){
    return this.httpClient.post(`${baseUrl}/auth/login`,loginData);
   }
   public responseToken(token:any){
    sessionStorage.setItem("token",token);
   }
   public isLoggedIn(){
    let tokenStr = sessionStorage.getItem("token");
    if(tokenStr == undefined || tokenStr ==  "" || tokenStr == null){
      return false;
    }
    return true;
   }
   public logOut(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    return true;
   }
   public getToken(){
    return sessionStorage.getItem("token");
   }
   public getUsernameFromToken(){
    return sessionStorage.getItem("token");
   } 
   public setUser(user:any){
    sessionStorage.setItem("user",JSON.stringify(user));
   }
   public getUser(){
    let userStr = sessionStorage.getItem("user");
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logOut();
      return null;
    }
   }
   public getUserRole(){
    let user = this.getUser();
    return user.roles[0].roleEnum;
   }
   public getCurrentUser(user:any){
    return this.httpClient.get(`${baseUrl}/auth/sessionUser/${user}`)
   }
}
