import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import {Contact} from './contact.model';
import * as fromContacts from './store/contacts.reducer';
import * as ContactsActions from './store/contacts.action';

@Injectable()
export class ContactsService {

  constructor(private httpClient: HttpClient, private store: Store<fromContacts.IContactState>) {}

  getSeed() {
    return this.httpClient.get('https://randomuser.me/api?results=10', {});
  }

  saveContacts() {
  }
}
