import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import {MomentModule} from 'angular2-moment';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IssService } from './services/iss.service';


const routes: Routes = [
  {path: '', redirectTo : 'home', pathMatch: 'full'},
  {path: 'home', component: AppComponent}
  ]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(routes),
    MomentModule
  ],
  providers: [IssService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
