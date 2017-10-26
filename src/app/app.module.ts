import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { ContactsReducer } from './contacts/store/contacts.reducer';
import {ContactsService} from './contacts/contacts.service';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule, DataListModule, InputTextModule, PanelModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactEditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({contacts: ContactsReducer}),
    PanelModule,
    InputTextModule,
    ButtonModule,
    DataListModule
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
