import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { Vue1Component } from './components/vue1/vue1.component';
import { Vue2Component } from './components/vue2/vue2.component';
import { Vue3Component } from './components/vue3/vue3.component';
@NgModule({
  declarations: [
    AppComponent,
    Vue1Component,
    Vue2Component,
    Vue3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
