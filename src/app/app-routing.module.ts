import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Vue1Component } from './components/vue1/vue1.component';
import { Vue2Component } from './components/vue2/vue2.component';
import { Vue3Component } from './components/vue3/vue3.component';

const routes: Routes = [
  {path:'vue1',component:Vue1Component},
  {path:'vue2',component:Vue2Component},
  {path:'vue3',component:Vue3Component},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
