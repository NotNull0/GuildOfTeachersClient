import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {UserDetailsService} from '../../user-details-service';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Injectable()
export class AdminCanActive {
  constructor(private _router: Router, private _userDetailsService: UserDetailsService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!isNullOrUndefined(localStorage.getItem('ROLE'))) {
      if (localStorage.getItem('ROLE') == 'MODERATOR')
        return true;
      else {
        this._router.navigateByUrl('/');
        return false;
      }
    } else {
      if (!isNullOrUndefined(sessionStorage.getItem('ROLE'))) {
        if (sessionStorage.getItem('ROLE') == 'MODERATOR')
          return true;
        else {
          this._router.navigateByUrl('/');
          return false;
        }
      }
    }
  }
}
