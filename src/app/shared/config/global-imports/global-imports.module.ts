import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipeModule} from "../../pipe/pipe.module";
import {CommonModule} from "@angular/common";
import {ScrollToModule} from "ng2-scroll-to";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import { TextMaskModule } from 'angular2-text-mask';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {EmojiPickerModule} from 'ng-emoji-picker';

@NgModule({
  imports: [
    ScrollToModule.forRoot(),
    BrowserModule.withServerTransition({appId: 'front'}),
  ],
  exports: [
    EmojiPickerModule,
    TextMaskModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    ScrollToModule,
    CommonModule,
    FormsModule,
    PipeModule,
    ReactiveFormsModule,
    FormsModule,
    MultiselectDropdownModule,
  ],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GlobalImportsModule {
}

