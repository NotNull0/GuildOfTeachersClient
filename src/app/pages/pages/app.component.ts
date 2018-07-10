import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';
import {UserService} from '../../shared/service/user.service';
import {UserDetailsService} from '../../shared/service/user-details-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  timer: Subscription;
  number: number = 0;

  constructor(private _router: Router, private _userDetails: UserDetailsService, private _userService: UserService) {
      // this._userService.get().subscribe(next => {
      //   if (this._userDetails.isLocal()) {
      //     console.log('is local');
      //     this._userDetails.loginWithLocal(next);
      //   } else {
      //     console.log('is session');
      //     this._userDetails.loginWithSession(next);
      //   }
      // }, err => {
      //   console.error(err);
      // });

    // if (!this._userDetails.isLocal() || !this._userDetails.isSession()) {
    //   localStorage.clear();
    //   sessionStorage.clear();
    //   this._userDetails.logout();
    //   this._router.navigateByUrl('/');
    // }
    this._router.events.subscribe(() => {
      // this.scroll();
      window.scrollTo(0, 0);
    }, error => {
      console.error(error);
    });
  }

//   scroll() {
//     this.number=parseInt((document.documentElement.scrollTop/(window.innerHeight/100))+"");
//     let t = Observable.timer(0,100);
// console.log("--------------------------")
//     this.timer = t.subscribe(next => {
//       console.log(this.number)
//       if (this.number <= 22) {
//         window.scrollTo(0, (window.innerHeight / 100 * this.number++));
//       } else {
//         this.timer.unsubscribe();
//         console.log("--------------------------")
//       }
//     });
//   }
}
