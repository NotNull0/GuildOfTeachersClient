import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {AppComponent} from './pages/pages/app.component';
import {GlobalImportsModule} from './shared/config/global-imports/global-imports.module';
import {PagesModule} from './pages/pages.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/service/interceptor/auth-interceptor';
import {UserDetailsService} from './shared/service/user-details-service';
import {LoginInterceptor} from './shared/service/interceptor/login-interceptor';
import {ContentInterceptor} from './shared/service/interceptor/content-interceptor';
import {ActivatedRoute, RouterModule, Routes} from '@angular/router';
import {pagesRoutes} from './pages/pages.routes';
import {CanActiveProvider} from './shared/service/can-active/can-active.provider';
import {StompService} from './shared/service/stomp.service';
import {User} from './shared/models/user';
import {UserService} from './shared/service/user.service';
import {ChatUserWrapperService} from './shared/service/chat-user-wrapper.service';
import {ChatMessageService} from './shared/service/chat-message.service';
import {ChatRoomService} from './shared/service/chat-room.service';


const _routes: Routes = [
  ...pagesRoutes
];

@NgModule({
  imports: [
    RouterModule.forRoot(_routes, {useHash: true}),
    GlobalImportsModule,
    PagesModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TockenActiveInterceptor,
    //   multi: true
    // },
    StompService,
    UserService,
    UserDetailsService,
    ChatUserWrapperService,
    ChatRoomService,
    ChatMessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    ...CanActiveProvider
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: []
})
export class AppModule {
  constructor(private _stomp:StompService){

  }
}
