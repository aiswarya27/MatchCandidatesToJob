import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/Common/http';
import { AppComponent } from './app.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidateListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
