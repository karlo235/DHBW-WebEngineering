import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WetterComponent } from "./components/wetter/wetter.component";
import { UnterschriftComponent } from "./components/unterschrift/unterschrift.component";

const routes: Routes = [
  {path: 'wetter', component: WetterComponent},
  {path: 'unterschrift', component: UnterschriftComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
