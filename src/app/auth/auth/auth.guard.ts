// import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn=(route, state)=> {
    if(localStorage.getItem('token') != null)
    {
      return true;
    }
    else
    {
        return false;
    }
};
