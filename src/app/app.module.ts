import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WetterComponent } from './components/wetter/wetter.component';
import { WetterService } from "./services/wetter/wetter.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UnterschriftComponent } from './components/unterschrift/unterschrift.component';

@NgModule({
  declarations: [
    AppComponent,
    WetterComponent,
    UnterschriftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [WetterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
