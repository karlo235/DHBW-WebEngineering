import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WetterComponent} from "./components/wetter/wetter.component";

const routes: Routes = [
  {path: 'wetter', component: WetterComponent},
  {path: '', redirectTo: 'wetter', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
