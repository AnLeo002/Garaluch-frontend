import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class UserGuard implements CanActivate{

  constructor(private loginService:LoginService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
    if(this.loginService.isLoggedIn()&&(this.loginService.getUserRole()=="TEACH" || this.loginService.getUserRole()=='FATHER') ){
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}

