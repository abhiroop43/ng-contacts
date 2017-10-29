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
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
  ButtonModule,
  CalendarModule,
  DataListModule,
  InputTextModule,
  PanelModule,
  RadioButtonModule
} from 'primeng/primeng';
import {EffectsModule} from '@ngrx/effects';
import {ContactsEffects} from './contacts/store/contacts.effects';
import {HttpClientModule} from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

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
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({contacts: ContactsReducer}),
    EffectsModule.forRoot([ContactsEffects]),
    PanelModule,
    InputTextModule,
    ButtonModule,
    DataListModule,
    CalendarModule,
    RadioButtonModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
