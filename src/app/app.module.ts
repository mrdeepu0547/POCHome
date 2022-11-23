import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PsHomeComponent } from './ps-home/ps-home.component';
import { FilterPipe } from './filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PsServiceService } from './ps-service.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatButtonModule} from'@angular/material/button';
import{MatSidenavModule} from'@angular/material/sidenav';
@NgModule({
  declarations: [
    AppComponent,
    PsHomeComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule
  ],
  providers: [PsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
